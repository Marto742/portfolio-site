import { Container } from './ui/Container'
import { Section } from './ui/Section'
import { Hero } from './sections/Hero'
import { useT } from '../i18n/context'

const PLACEHOLDER_SECTIONS = ['about', 'work', 'skills', 'contact'] as const

/**
 * Localized landing page. Hero is real (Phase 3); the remaining anchored
 * sections are stubs that get their content in the coming phases.
 */
export function HomePage() {
  const t = useT()
  return (
    <>
      <Hero />
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
