import { HomePage } from '../components/HomePage'
import { pageMeta, personSchema } from '../lib/seo'

export function meta() {
  return [...pageMeta('/'), { 'script:ld+json': personSchema() }]
}

export default function Home() {
  return <HomePage />
}
