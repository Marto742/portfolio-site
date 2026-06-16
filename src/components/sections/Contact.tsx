import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Reveal } from '../motion/reveal'
import { buttonClasses } from '../ui/button-styles'
import { useT } from '../../i18n/context'
import { SITE } from '../../config'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClasses =
  'mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-3 text-fg placeholder:text-muted/60 focus-visible:border-accent aria-[invalid=true]:border-red-500/70'

export function Contact() {
  const t = useT()
  const f = t.contact.form
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  function update(field: keyof typeof values) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      if (field !== 'company') {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = f.requiredName
    if (!values.email.trim()) next.email = f.requiredEmail
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.invalidEmail
    if (!values.message.trim()) next.message = f.requiredMessage
    return next
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    // Honeypot: a bot filled the hidden field. Pretend success, send nothing.
    if (values.company) {
      setStatus('success')
      return
    }
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setValues({ name: '', email: '', message: '', company: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" className="border-t border-line/50">
      <Container className="max-w-2xl">
        <Reveal>
          <header>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {t.sections.contact}
            </h2>
            <p className="mt-4 text-lg text-muted">{t.contact.subtitle}</p>
          </header>
        </Reveal>

        <form onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-fg">
              {f.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={update('name')}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClasses}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-fg">
              {f.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={update('email')}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClasses}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-fg">
              {f.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`${inputClasses} resize-y`}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={update('company')}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className={buttonClasses('primary')}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? f.sending : f.send}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <span className="text-accent">{f.success}</span>
              )}
              {status === 'error' && (
                <span className="text-red-400">{f.error}</span>
              )}
            </p>
          </div>
        </form>

        <p className="mt-10 text-sm text-muted">
          {t.contact.orReach}:{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {SITE.email}
          </a>{' '}
          ·{' '}
          <a
            href={SITE.githubProfile}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {t.contact.githubLabel} ↗
          </a>{' '}
          ·{' '}
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            CV ↗
          </a>
        </p>
      </Container>
    </Section>
  )
}
