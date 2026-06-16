// Renders scripts/og-image.html to public/og-image.png (1200x630) via headless
// Chrome. Run with `npm run og:gen`. Requires Google Chrome installed.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const html = join(here, 'og-image.html')
const out = join(here, '..', 'public', 'og-image.png')

const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) {
  console.error('Chrome not found — skipping OG image generation.')
  process.exit(1)
}

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  `--screenshot=${out}`,
  `file:///${html.replace(/\\/g, '/')}`,
])
console.log(`OG: wrote ${out}`)
