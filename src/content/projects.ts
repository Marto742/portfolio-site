export type ProjectSlug = 'ecommerce' | 'simon-says' | 'domsenz'

export type ProjectLinkLabel = 'live' | 'admin' | 'repo' | 'video'

export interface ProjectLink {
  label: ProjectLinkLabel
  href: string
}

export interface Project {
  slug: ProjectSlug
  featured: boolean
  kind: 'web' | 'embedded' | 'startup'
  /** Tech tags, language-neutral. */
  stack: string[]
  links: ProjectLink[]
}

/**
 * Language-neutral project facts (links, stack). All verified against the real
 * repos / live deployments. Localized copy lives in `translations.ts` keyed by
 * slug. DomSenz firmware is intentionally not linked — it isn't public.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'ecommerce',
    featured: true,
    kind: 'web',
    stack: [
      'Next.js 15',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Stripe',
      'Turborepo',
      'Vitest',
      'Playwright',
    ],
    links: [
      {
        label: 'live',
        href: 'https://e-commerce-platform-web-735a.vercel.app/',
      },
      {
        label: 'admin',
        href: 'https://e-commerce-platform-admin-xi.vercel.app/',
      },
      {
        label: 'repo',
        href: 'https://github.com/Marto742/E-Commerce-Platform',
      },
    ],
  },
  {
    slug: 'simon-says',
    featured: false,
    kind: 'embedded',
    stack: ['Arduino Uno', 'C++', '1602 LCD', 'EEPROM', 'Buzzer'],
    links: [
      { label: 'video', href: 'https://www.youtube.com/watch?v=HuJ8rlX6Xxs' },
      { label: 'repo', href: 'https://github.com/Marto742/simon-says-arduino' },
    ],
  },
  {
    slug: 'domsenz',
    featured: false,
    kind: 'startup',
    stack: ['Vite', 'Cloudflare Workers', 'Formspree'],
    links: [
      { label: 'live', href: 'https://domsens-landing.bgm89044.workers.dev' },
    ],
  },
]
