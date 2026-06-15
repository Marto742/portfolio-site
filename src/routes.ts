import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('bg', 'routes/home.bg.tsx'),
] satisfies RouteConfig
