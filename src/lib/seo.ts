import { SITE } from '../config'
import { langFromPath, localizedPath, toEnPath } from '../i18n/routing'
import { resolveHead } from './head'

/** Absolute URL for a path on the canonical origin. */
function abs(path: string): string {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
}

const OG_IMAGE = `${SITE.url}/og-image.png`

/**
 * OpenGraph / Twitter / canonical / hreflang descriptors for a React Router
 * `meta` export. Title + description themselves are rendered by the root
 * Layout (see {@link resolveHead}); here they only feed the social tags.
 */
export function pageMeta(pathname: string) {
  const lang = langFromPath(pathname)
  const { title, description } = resolveHead(pathname)
  const canonical = abs(pathname)
  const enHref = abs(toEnPath(pathname))
  const bgHref = abs(localizedPath(pathname, 'bg'))

  return [
    { tagName: 'link', rel: 'canonical', href: canonical },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:locale', content: lang === 'bg' ? 'bg_BG' : 'en_US' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: OG_IMAGE },

    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: enHref },
    { tagName: 'link', rel: 'alternate', hrefLang: 'bg', href: bgHref },
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: enHref },
  ]
}

/** schema.org Person JSON-LD for the home pages. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    jobTitle: 'Full-Stack & Embedded Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Plovdiv',
      addressCountry: 'BG',
    },
    sameAs: [SITE.githubProfile],
  }
}
