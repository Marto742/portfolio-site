import type { ReactNode } from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'

import '@fontsource-variable/cormorant'
import '@fontsource-variable/manrope'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

import { MotionConfig } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LangProvider } from './i18n/LangProvider'
import { langFromPath } from './i18n/routing'
import { SiteLayout } from './components/layout/SiteLayout'
import { CursorGlow } from './components/motion/CursorGlow'

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0a09" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
        {/* If JS never runs, scroll-reveal elements must still be visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider lang={lang}>
        <CursorGlow />
        <SiteLayout>
          <Outlet />
        </SiteLayout>
        <Analytics />
        <SpeedInsights />
      </LangProvider>
    </MotionConfig>
  )
}
