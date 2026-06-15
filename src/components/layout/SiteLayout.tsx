import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Container } from '../ui/Container'
import { LanguageSwitch } from './LanguageSwitch'
import { useLang, useT } from '../../i18n/context'
import { homePath } from '../../i18n/routing'
import { SITE } from '../../config'

const NAV_ITEMS = ['about', 'work', 'skills', 'contact'] as const

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const lang = useLang()
  const t = useT()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const year = new Date().getFullYear()

  // Close the mobile menu when the route changes — React's "adjust state during
  // render" pattern, which avoids an effect.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  // Section links live on the home page. From a case-study page, point back to
  // the home page's section; on the home page, use a same-page anchor.
  const onHome = pathname === '/' || pathname === '/bg'
  const sectionHref = (id: string) =>
    onHome ? `#${id}` : `${homePath(lang)}#${id}`

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
      >
        {t.nav.skip}
      </a>

      <header className="sticky top-0 z-50 border-b border-line/60 bg-canvas/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            to={homePath(lang)}
            className="font-display text-2xl font-semibold tracking-tight text-fg"
            aria-label={SITE.name}
          >
            MP
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={sectionHref(item)}
                className="transition-colors hover:text-fg"
              >
                {t.nav[item]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:text-fg md:hidden"
              aria-label={t.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </Container>

        {menuOpen && (
          <nav
            id="mobile-nav"
            className="border-t border-line/60 bg-canvas/95 md:hidden"
          >
            <Container className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={sectionHref(item)}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line/40 py-3 text-muted transition-colors last:border-0 hover:text-fg"
                >
                  {t.nav[item]}
                </a>
              ))}
            </Container>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>

      <footer className="border-t border-line">
        <Container className="flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs text-muted">
              {t.footer.builtWith} {SITE.builtWith.join(' · ')}
            </p>
            <p className="text-sm text-muted">
              © {year} {SITE.name}. {t.footer.rights}
            </p>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a
              href={SITE.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              {t.footer.source} ↗
            </a>
            <LanguageSwitch />
          </div>
        </Container>
      </footer>
    </div>
  )
}
