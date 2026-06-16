/** Site-wide constants. Update repoUrl once the portfolio repo is pushed. */
export const SITE = {
  name: 'Martin Petrov',
  /** Canonical production origin, no trailing slash. Set VITE_SITE_URL at deploy. */
  url: import.meta.env.VITE_SITE_URL ?? 'https://martinpetrov.dev',
  githubProfile: 'https://github.com/Marto742',
  // TODO: point at the dedicated portfolio repo once it's on GitHub.
  repoUrl: 'https://github.com/Marto742',
  email: 'petrovmartin955@gmail.com',
  /** Tech proudly shown in the footer colophon. */
  builtWith: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
} as const
