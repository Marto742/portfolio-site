import { Container } from './ui/Container'
import { Section } from './ui/Section'
import { buttonClasses } from './ui/button-styles'
import { useT } from '../i18n/context'

const PLACEHOLDER_SECTIONS = ['about', 'work', 'skills', 'contact'] as const

/**
 * Localized landing page. Hero + anchored section stubs for now; each section
 * gets its real content in the coming phases.
 */
export function HomePage() {
  const t = useT()
  return (
    <>
      <Section className="pt-28 sm:pt-36">
        <Container className="max-w-3xl space-y-6">
          <p className="font-mono text-sm tracking-wide text-accent">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-6xl font-semibold tracking-tight text-fg sm:text-7xl">
            Martin Petrov
          </h1>
          <p className="max-w-xl text-lg text-muted">{t.hero.lead}</p>
          <div className="flex flex-wrap gap-4">
            <a className={buttonClasses('primary')} href="#work">
              {t.hero.viewWork}
            </a>
            <a className={buttonClasses('secondary')} href="#contact">
              {t.hero.getInTouch}
            </a>
          </div>
        </Container>
      </Section>

      {PLACEHOLDER_SECTIONS.map((id) => (
        <Section key={id} id={id} className="border-t border-line/50">
          <Container>
            <h2 className="font-display text-3xl text-fg sm:text-4xl">
              {t.sections[id]}
            </h2>
            <p className="mt-3 text-muted">{t.sections.placeholder}</p>
          </Container>
        </Section>
      ))}
    </>
  )
}
