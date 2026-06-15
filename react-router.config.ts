import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  // Static site: no runtime server. Every route is prerendered to plain HTML
  // at build time for SEO + fast first paint.
  ssr: false,
  prerender: ['/', '/bg'],
} satisfies Config
