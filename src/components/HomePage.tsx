import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Work } from './sections/Work'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

/** Localized landing page: the full single-page scroll spine. */
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
    </>
  )
}
