import type { Route } from './+types/work'
import { CaseStudy } from '../components/sections/CaseStudy'
import { Container } from '../components/ui/Container'
import { pageMeta } from '../lib/seo'
import { PROJECTS, type ProjectSlug } from '../content/projects'

function isProjectSlug(slug: string): slug is ProjectSlug {
  return PROJECTS.some((p) => p.slug === slug)
}

export function meta({ location }: Route.MetaArgs) {
  return pageMeta(location.pathname)
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
