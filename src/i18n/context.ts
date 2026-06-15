import { createContext, useContext } from 'react'
import { translations, type Lang, type Translations } from './translations'

export const LangContext = createContext<Lang>('en')

/** Current language from context. */
export function useLang(): Lang {
  return useContext(LangContext)
}

/** Translations for the current language. */
export function useT(): Translations {
  return translations[useLang()]
}
