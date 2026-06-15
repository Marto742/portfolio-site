import { Link } from 'react-router'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'
import { useLang, useT } from '../../i18n/context'
import { workPath } from '../../i18n/routing'
import { PROJECTS, type Project } from '../../content/projects'
import { cn } from '../../lib/utils'

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  const t = useT()
  const lang = useLang()
  const tp = t.work.projects[project.slug]

  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/40',
        featured && 'sm:p-10',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {tp.kindLabel}
        </span>
        {featured && (
          <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {t.work.star}
          </span>
        )}
      </div>

      <h3
        className={cn(
          'mt-4 font-display text-fg',
          featured ? 'text-4xl sm:text-5xl' : 'text-3xl',
        )}
      >
        {tp.name}
      </h3>
      <p className="mt-2 text-accent">{tp.tagline}</p>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{tp.blurb}</p>

      {tp.metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
          {tp.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-2xl text-fg">{metric.value}</dt>
              <dd className="mt-1 font-mono text-xs text-muted">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-5 pt-8">
        <Link
          to={workPath(lang, project.slug)}
          className="font-mono text-sm font-medium text-accent transition-colors hover:text-accent-light"
        >
          {t.caseStudy.cta} →
        </Link>
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {t.work.links[link.label]} ↗
          </a>
        ))}
      </div>
    </article>
  )
}

export function Work() {
  const t = useT()
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <Section id="work" className="border-t border-line/50">
      <Container>
        <header className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {t.sections.work}
          </p>
          <p className="mt-4 text-lg text-muted">{t.work.subtitle}</p>
        </header>

        <div className="mt-12 space-y-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
