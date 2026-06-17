import { PROJECTS, type ProjectSlug } from '../content/projects'
import { langFromPath } from '../i18n/routing'
import { translations } from '../i18n/translations'

export interface HeadInfo {
  title: string
  description: string
}

/**
 * Resolve the document title + description for any path. This is the single
 * source of truth: the root Layout renders `<title>`/`<meta name=description>`
 * from it (React 19 manages those natively and reliably across hydration),
 * and `pageMeta` reuses it for the OpenGraph/Twitter tags.
 */
export function resolveHead(pathname: string): HeadInfo {
  const t = translations[langFromPath(pathname)]
  const path =
    pathname === '/bg'
      ? '/'
      : pathname.startsWith('/bg/')
        ? pathname.slice(3)
        : pathname

  if (path === '/cv') {
    return { title: `CV — ${t.meta.title}`, description: t.meta.description }
  }

  const work = path.match(/^\/work\/([^/]+)$/)
  if (work && PROJECTS.some((p) => p.slug === work[1])) {
    const project = t.work.projects[work[1] as ProjectSlug]
    return {
      title: `${project.name} — ${t.meta.title}`,
      description: project.tagline,
    }
  }

  return { title: t.meta.title, description: t.meta.description }
}
