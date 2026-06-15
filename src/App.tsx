import { Container } from './components/ui/Container'
import { Section } from './components/ui/Section'
import { Button } from './components/ui/Button'
import { buttonClasses } from './components/ui/button-styles'
import { Tag } from './components/ui/Tag'

const STACK = ['React', 'TypeScript', 'Node', 'Supabase', 'C++', 'Arduino']

/**
 * Temporary design-system preview (Phase 1). Real sections replace this in the
 * coming phases — its only job is to prove the tokens and primitives render.
 * The Bulgarian block confirms the swapped fonts cover Cyrillic.
 */
function App() {
  return (
    <main>
      <Section>
        <Container className="space-y-14">
          <header className="space-y-5">
            <p className="font-mono text-sm tracking-wide text-accent">
              Design system · Phase 1
            </p>
            <h1 className="font-display text-6xl font-semibold tracking-tight text-fg sm:text-7xl">
              Martin Petrov
            </h1>
            <p className="max-w-xl text-lg text-muted">
              Self-taught full-stack &amp; embedded developer. A temporary token
              preview — real sections come next.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>View projects</Button>
              <a className={buttonClasses('secondary')} href="#contact">
                Get in touch
              </a>
              <a className={buttonClasses('ghost')} href="#work">
                Explore →
              </a>
            </div>
          </header>

          <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <h2 className="font-display text-3xl text-fg">Surface panel</h2>
            <p className="mt-2 max-w-prose text-muted">
              Secondary text on a raised surface — checking contrast, type scale
              and corner radius.
            </p>

            {/* Cyrillic check — confirms Cormorant + Manrope render Bulgarian */}
            <p className="mt-6 font-display text-3xl text-fg">
              Заглавие на български
            </p>
            <p className="max-w-prose text-muted">
              Основен текст на български — тест за кирилица (Manrope).
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}

export default App
