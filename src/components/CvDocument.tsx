import { SITE } from '../config'
import { translations } from '../i18n/translations'
import { SKILL_GROUPS } from '../content/skills'
import { PROJECTS } from '../content/projects'

const SUMMARY =
  'Self-taught full-stack and embedded developer from Plovdiv, Bulgaria. I build and ship production web platforms (React / Next.js, Node, PostgreSQL) and real embedded firmware (C++, Arduino) — from zero, end to end. Currently building DomSenz, a Bulgarian smart-home startup.'

const t = translations.en

function bareUrl(href: string): string {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * Light, print-friendly CV sheet, data-driven from the same content as the site.
 * Rendered at /cv (web-viewable) and printed to public/cv.pdf via headless Chrome.
 */
export function CvDocument() {
  return (
    <div className="mx-auto my-10 max-w-3xl bg-white p-12 text-neutral-900 shadow-2xl [print-color-adjust:exact] print:my-0 print:max-w-none print:p-0 print:shadow-none">
      <header className="border-b border-neutral-200 pb-6">
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Martin Petrov
        </h1>
        <p className="mt-1 text-lg text-[#a07d1f]">
          Full-Stack &amp; Embedded Developer
        </p>
        <p className="mt-3 font-mono text-sm text-neutral-500">
          Plovdiv, Bulgaria · {SITE.email} · {bareUrl(SITE.githubProfile)}
        </p>
      </header>

      <section className="mt-6">
        <p className="leading-relaxed text-neutral-700">{SUMMARY}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#a07d1f]">
          Skills
        </h2>
        <div className="mt-3 space-y-1.5 text-sm">
          {SKILL_GROUPS.map((group) => (
            <p key={group.id}>
              <span className="font-semibold">
                {t.skills.groups[group.id]}:
              </span>{' '}
              <span className="text-neutral-700">{group.items.join(', ')}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#a07d1f]">
          Selected work
        </h2>
        <div className="mt-3 space-y-5">
          {PROJECTS.map((project) => {
            const p = t.work.projects[project.slug]
            const primary = project.links[0]
            return (
              <div key={project.slug}>
                <h3 className="font-semibold">
                  {p.name}
                  <span className="font-normal text-neutral-500">
                    {' '}
                    — {p.tagline}
                  </span>
                </h3>
                <p className="mt-0.5 text-sm text-neutral-700">{p.blurb}</p>
                <p className="mt-1 font-mono text-xs text-neutral-500">
                  {project.stack.slice(0, 6).join(' · ')}
                  {primary ? ` — ${bareUrl(primary.href)}` : ''}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
