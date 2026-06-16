import { HomePage } from '../components/HomePage'
import { translations } from '../i18n/translations'
import { pageMeta, personSchema } from '../lib/seo'

export function meta() {
  const m = translations.bg.meta
  return [
    ...pageMeta({
      lang: 'bg',
      pathname: '/bg',
      title: m.title,
      description: m.description,
    }),
    { 'script:ld+json': personSchema() },
  ]
}

export default function HomeBg() {
  return <HomePage />
}
