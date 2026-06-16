import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'
import { Reveal } from '../motion/reveal'
import { useT } from '../../i18n/context'
import { SKILL_GROUPS } from '../../content/skills'

export function Skills() {
  const t = useT()
  return (
    <Section id="skills" className="border-t border-line/50">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {t.sections.skills}
            </h2>
            <p className="mt-4 text-lg text-muted">{t.skills.subtitle}</p>
          </header>
        </Reveal>

        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="bg-surface p-8">
              <h3 className="font-display text-xl text-fg">
                {t.skills.groups[group.id]}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
