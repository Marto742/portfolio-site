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

import { LangProvider } from './i18n/LangProvider'
import { langFromPath } from './i18n/routing'
import { SiteLayout } from './components/layout/SiteLayout'

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
    <LangProvider lang={lang}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </LangProvider>
  )
}
