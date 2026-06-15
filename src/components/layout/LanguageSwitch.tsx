import { Link, useLocation } from 'react-router'
import { useLang } from '../../i18n/context'
import { LANGS } from '../../i18n/translations'
import { localizedPath } from '../../i18n/routing'
import { cn } from '../../lib/utils'

export function LanguageSwitch() {
  const { pathname } = useLocation()
  const current = useLang()
  return (
    <div
      className="flex items-center gap-1 font-mono text-xs"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((lng) => (
        <Link
          key={lng}
          to={localizedPath(pathname, lng)}
          className={cn(
            'rounded px-2 py-1 uppercase transition-colors',
            lng === current ? 'text-accent' : 'text-muted hover:text-fg',
          )}
          aria-current={lng === current ? 'page' : undefined}
        >
          {lng}
        </Link>
      ))}
    </div>
  )
}
