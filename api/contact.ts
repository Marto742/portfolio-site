import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).max(200).regex(EMAIL_RE),
  message: z.string().trim().min(1).max(5000),
  company: z.string().optional(), // honeypot
})

// Best-effort in-memory throttle (per warm instance). Durable, cross-instance
// limiting would use Upstash Redis; this stops casual abuse without extra infra.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const forwarded = req.headers['x-forwarded-for']
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)
      ?.split(',')[0]
      ?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' })
  }
  const { name, email, message, company } = parsed.data

  // Honeypot filled → silently accept (don't send, don't reveal the trap).
  if (company) {
    return res.status(200).json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO ?? 'bgm89044@gmail.com'
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email is not configured' })
  }

  const resend = new Resend(apiKey)
  try {
    const { error } = await resend.emails.send({
      // Resend's shared sender works without a verified domain; swap for a
      // domain address (e.g. contact@domsens.bg) once the domain is connected.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    if (error) {
      console.error('Resend error', error)
      return res.status(502).json({ error: 'Failed to send' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Send failed', err)
    return res.status(502).json({ error: 'Failed to send' })
  }
}
