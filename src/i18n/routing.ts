import type { Lang } from './translations'

/** Derive the active language from a pathname (`/bg` → Bulgarian, else English). */
export function langFromPath(pathname: string): Lang {
  return pathname === '/bg' || pathname.startsWith('/bg/') ? 'bg' : 'en'
}

/** Strip the `/bg` prefix to get the canonical (English) path. */
export function toEnPath(pathname: string): string {
  if (pathname === '/bg') return '/'
  if (pathname.startsWith('/bg/')) return pathname.slice(3)
  return pathname
}

/** Build the equivalent path in `lang` from any current pathname. */
export function localizedPath(pathname: string, lang: Lang): string {
  const en = toEnPath(pathname)
  if (lang === 'en') return en
  return en === '/' ? '/bg' : `/bg${en}`
}

/** Home path for a language. */
export function homePath(lang: Lang): string {
  return lang === 'bg' ? '/bg' : '/'
}

/**
 * hreflang alternates for a route. Paths are relative for now; they become
 * absolute (with the production origin) in the SEO phase.
 */
export function hreflangLinks() {
  return [
    { rel: 'alternate', hrefLang: 'en', href: '/' },
    { rel: 'alternate', hrefLang: 'bg', href: '/bg' },
    { rel: 'alternate', hrefLang: 'x-default', href: '/' },
  ]
}
