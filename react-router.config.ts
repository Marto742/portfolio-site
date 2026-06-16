import type { Config } from '@react-router/dev/config'
import { PROJECTS } from './src/content/projects'

const workPaths = PROJECTS.flatMap((p) => [
  `/work/${p.slug}`,
  `/bg/work/${p.slug}`,
])

export default {
  appDirectory: 'src',
  // Static site: no runtime server. Every route is prerendered to plain HTML
  // at build time for SEO + fast first paint.
  ssr: false,
  prerender: ['/', '/bg', '/cv', ...workPaths],
} satisfies Config
