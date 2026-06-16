// Prints the built /cv route to public/cv.pdf via headless Chrome. Serves
// build/client over a throwaway HTTP server so assets/fonts resolve. Requires
// a prior `npm run build`. Run with `npm run cv:gen`.
import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import { tmpdir } from 'node:os'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', 'build', 'client')
const out = join(here, '..', 'public', 'cv.pdf')

if (!existsSync(join(root, 'cv', 'index.html'))) {
  console.error('build/client/cv not found — run `npm run build` first.')
  process.exit(1)
}

const chrome = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => existsSync(p))
if (!chrome) {
  console.error('Chrome not found — skipping CV PDF generation.')
  process.exit(1)
}

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
}

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0])
  const direct = join(root, p)
  if (existsSync(direct) && statSync(direct).isFile()) return direct
  const asIndex = join(root, p, 'index.html')
  if (existsSync(asIndex)) return asIndex
  return null
}

const server = http.createServer(async (req, res) => {
  const file = resolveFile(req.url || '/')
  if (!file) {
    res.statusCode = 404
    res.end('not found')
    return
  }
  res.setHeader(
    'Content-Type',
    TYPES[extname(file)] ?? 'application/octet-stream',
  )
  res.end(await readFile(file))
})

await new Promise((resolve) => server.listen(0, resolve))
const { port } = server.address()
try {
  // Isolated profile + no-sandbox so it never conflicts with a running Chrome.
  const profileDir = join(tmpdir(), `cv-chrome-${Date.now()}`)
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${profileDir}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${out}`,
    `http://localhost:${port}/cv`,
  ])
  console.log(`CV: wrote ${out}`)
} finally {
  server.close()
}
