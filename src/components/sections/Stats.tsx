import { Container } from '../ui/Container'
import { Reveal } from '../motion/reveal'
import { useT } from '../../i18n/context'

export function Stats() {
  const t = useT()
  return (
    <section
      aria-label={t.stats.label}
      className="border-y border-line bg-gradient-to-b from-surface/50 to-transparent"
    >
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 py-12 sm:grid-cols-4">
            {t.stats.items.map((item) => (
              <div key={item.label} className="px-4 text-center">
                <dt className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                  {item.value}
                </dt>
                <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
