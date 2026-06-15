import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Container } from '../ui/Container'
import { LanguageSwitch } from './LanguageSwitch'
import { useLang, useT } from '../../i18n/context'
import { homePath } from '../../i18n/routing'
import { SITE } from '../../config'

const NAV_ITEMS = ['about', 'work', 'skills', 'contact'] as const

export function SiteLayout({ children }: { children: ReactNode }) {
  const lang = useLang()
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-svh flex-col">
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
                href={`#${item}`}
                className="transition-colors hover:text-fg"
              >
                {t.nav[item]}
              </a>
            ))}
          </nav>
          <LanguageSwitch />
        </Container>
      </header>

      <main className="flex-1">{children}</main>

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
