import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('bg', 'routes/home.bg.tsx'),
  route('work/:slug', 'routes/work.tsx'),
  route('bg/work/:slug', 'routes/work.tsx', { id: 'work-bg' }),
] satisfies RouteConfig
