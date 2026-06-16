import { Container } from '../ui/Container'
import { buttonClasses } from '../ui/button-styles'
import { useT } from '../../i18n/context'
import { HeroBackground } from './HeroBackground'
import { Hero3D } from '../three/Hero3D'

export function Hero() {
  const t = useT()
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      <HeroBackground />
      <Hero3D />
      <Container className="relative z-10 py-20">
        <div className="max-w-4xl">
          <p
            className="hero-rise font-mono text-xs uppercase tracking-[0.25em] text-accent sm:text-sm"
            style={{ animationDelay: '0.05s' }}
          >
            {t.hero.eyebrow}
          </p>
          <h1
            className="hero-rise mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.12s' }}
          >
            Martin Petrov
          </h1>
          <p
            className="hero-rise mt-8 max-w-2xl text-lg text-muted sm:text-xl"
            style={{ animationDelay: '0.22s' }}
          >
            {t.hero.lead}
          </p>
          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '0.32s' }}
          >
            <a className={buttonClasses('primary')} href="#work">
              {t.hero.viewWork}
            </a>
            <a className={buttonClasses('secondary')} href="#contact">
              {t.hero.getInTouch}
            </a>
          </div>
          <p
            className="hero-rise mt-12 font-mono text-xs text-muted"
            style={{ animationDelay: '0.42s' }}
          >
            {t.hero.location}
          </p>
        </div>
      </Container>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          {t.hero.scroll}
        </span>
        <span className="h-10 w-px animate-pulse bg-linear-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
