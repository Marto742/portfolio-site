import { HomePage } from '../components/HomePage'
import { translations } from '../i18n/translations'
import { hreflangLinks } from '../i18n/routing'

export function meta() {
  const m = translations.en.meta
  return [{ title: m.title }, { name: 'description', content: m.description }]
}

export function links() {
  return hreflangLinks()
}

export default function Home() {
  return <HomePage />
}
