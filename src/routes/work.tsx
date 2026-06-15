import type { Route } from './+types/work'
import { CaseStudy } from '../components/sections/CaseStudy'
import { Container } from '../components/ui/Container'
import { translations } from '../i18n/translations'
import { langFromPath } from '../i18n/routing'
import { PROJECTS, type ProjectSlug } from '../content/projects'

function isProjectSlug(slug: string): slug is ProjectSlug {
  return PROJECTS.some((p) => p.slug === slug)
}

export function meta({ params, location }: Route.MetaArgs) {
  const lang = langFromPath(location.pathname)
  const t = translations[lang]
  const slug = params.slug
  const project = isProjectSlug(slug) ? t.work.projects[slug] : undefined
  const title = project ? `${project.name} — ${t.meta.title}` : t.meta.title
  const description = project?.tagline ?? t.meta.description
  return [
    { title },
    { name: 'description', content: description },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'en',
      href: `/work/${slug}`,
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'bg',
      href: `/bg/work/${slug}`,
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: `/work/${slug}`,
    },
  ]
}

export default function WorkRoute({ params }: Route.ComponentProps) {
  const slug = params.slug
  if (!isProjectSlug(slug)) {
    return (
      <Container className="max-w-3xl py-32 text-center">
        <p className="font-mono text-muted">Project not found.</p>
      </Container>
    )
  }
  return <CaseStudy slug={slug} />
}
