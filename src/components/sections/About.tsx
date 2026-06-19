import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Reveal } from '../motion/reveal'
import { useT } from '../../i18n/context'

export function About() {
  const t = useT()
  return (
    <Section id="about" className="border-t border-line/50">
      <Container>
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {t.sections.about}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-fg sm:text-5xl">
              {t.about.heading}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {t.about.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-surface p-8 transition-colors duration-300 hover:bg-[#1c1813]"
            >
              <h3 className="font-display text-xl text-fg">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
