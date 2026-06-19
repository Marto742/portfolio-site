import { Link } from 'react-router'
import { Container } from '../ui/Container'
import { Tag } from '../ui/Tag'
import { VideoEmbed } from '../ui/VideoEmbed'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { useLang, useT } from '../../i18n/context'
import { homePath } from '../../i18n/routing'
import { PROJECTS, type ProjectSlug } from '../../content/projects'
import { CASE_STUDIES } from '../../content/case-studies'

const SIMON_VIDEO_ID = 'HuJ8rlX6Xxs'

export function CaseStudy({ slug }: { slug: ProjectSlug }) {
  const lang = useLang()
  const t = useT()
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return null

  const tp = t.work.projects[slug]
  const content = CASE_STUDIES[lang][slug]

  return (
    <article className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          to={`${homePath(lang)}#work`}
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← {t.caseStudy.back}
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {tp.kindLabel}
          </p>
          <h1 className="mt-4 font-display text-5xl text-fg sm:text-6xl">
            {tp.name}
          </h1>
          <p className="mt-3 text-xl text-muted">{tp.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-5">
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

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </header>

        {tp.metrics.length > 0 && (
          <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-line py-6">
            {tp.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-display text-3xl text-fg">
                  {metric.value}
                </dt>
                <dd className="mt-1 font-mono text-xs text-muted">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-12 text-lg leading-relaxed text-muted">
          {content.intro}
        </p>

        {slug === 'simon-says' ? (
          <div className="mt-10">
            <VideoEmbed id={SIMON_VIDEO_ID} title={tp.name} />
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <img
              src={`/projects/${slug}.webp`}
              alt={tp.name}
              loading="lazy"
              className="w-full"
            />
          </div>
        )}

        <div className="mt-12 space-y-12">
          {content.sections.map((section, idx) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-fg sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {slug === 'ecommerce' && idx === 0 && (
                <div className="mt-8">
                  <ArchitectureDiagram />
                </div>
              )}
            </section>
          ))}
        </div>
      </Container>
    </article>
  )
}
