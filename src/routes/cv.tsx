import { CvDocument } from '../components/CvDocument'

export function meta() {
  return [{ name: 'robots', content: 'noindex' }]
}

export default function Cv() {
  return <CvDocument />
}
