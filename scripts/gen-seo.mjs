// Generates public/sitemap.xml and public/robots.txt from the known routes.
// Run via `npm run seo:gen`; also runs automatically before each build.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = (
  process.env.VITE_SITE_URL ?? 'https://portfolio-site-theta-lilac.vercel.app'
).replace(/\/$/, '')

const slugs = ['ecommerce', 'simon-says', 'domsenz']
const paths = [
  '/',
  '/bg',
  ...slugs.flatMap((slug) => [`/work/${slug}`, `/bg/work/${slug}`]),
]

const abs = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${abs(p)}</loc></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)
console.log(`SEO: wrote sitemap.xml + robots.txt for ${SITE_URL}`)
