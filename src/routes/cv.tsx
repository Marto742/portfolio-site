import { CvDocument } from '../components/CvDocument'
import { SITE } from '../config'

export function meta() {
  return [
    { title: `CV — ${SITE.name}` },
    {
      name: 'description',
      content:
        'Curriculum vitae of Martin Petrov — full-stack & embedded developer.',
    },
    { name: 'robots', content: 'noindex' },
  ]
}

export default function Cv() {
  return <CvDocument />
}
