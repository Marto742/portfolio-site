import type { ReactNode } from 'react'
import { LangContext } from './context'
import type { Lang } from './translations'

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang
  children: ReactNode
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}
