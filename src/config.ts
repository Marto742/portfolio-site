/** Site-wide constants. */
export const SITE = {
  name: 'Martin Petrov',
  /** Canonical production origin, no trailing slash. Set VITE_SITE_URL at deploy. */
  url: import.meta.env.VITE_SITE_URL ?? 'https://martinpetrov.dev',
  githubProfile: 'https://github.com/Marto742',
  repoUrl: 'https://github.com/Marto742/portfolio-site',
  email: 'petrovmartin955@gmail.com',
  /** Tech proudly shown in the footer colophon. */
  builtWith: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
} as const
