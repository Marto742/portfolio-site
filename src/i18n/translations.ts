export const LANGS = ['en', 'bg'] as const
export type Lang = (typeof LANGS)[number]

const en = {
  meta: {
    title: 'Martin Petrov — Full-Stack & Embedded Developer',
    description:
      'Self-taught full-stack and embedded developer from Plovdiv. Production web systems and real hardware — shipped, tested, and live.',
  },
  nav: {
    about: 'About',
    work: 'Work',
    skills: 'Skills',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Full-stack & embedded developer',
    lead: 'I build production software and real hardware — self-taught, from zero, shipped and live.',
    viewWork: 'View projects',
    getInTouch: 'Get in touch',
  },
  sections: {
    about: 'About',
    work: 'Selected work',
    skills: 'Skills & stack',
    contact: 'Get in touch',
    placeholder: 'Coming together in the next phases.',
  },
  footer: {
    builtWith: 'Built with',
    source: 'Source',
    rights: 'All rights reserved.',
  },
  langSwitch: {
    label: 'Language',
  },
}

export type Translations = typeof en

const bg: Translations = {
  meta: {
    title: 'Мартин Петров — Full-Stack & Embedded разработчик',
    description:
      'Самоук full-stack и embedded разработчик от Пловдив. Production уеб системи и истински хардуер — завършени, тествани и на живо.',
  },
  nav: {
    about: 'За мен',
    work: 'Проекти',
    skills: 'Умения',
    contact: 'Контакт',
  },
  hero: {
    eyebrow: 'Full-stack & embedded разработчик',
    lead: 'Изграждам production софтуер и истински хардуер — самоук, от нула, завършено и на живо.',
    viewWork: 'Виж проектите',
    getInTouch: 'Свържи се',
  },
  sections: {
    about: 'За мен',
    work: 'Избрани проекти',
    skills: 'Умения и стек',
    contact: 'Свържи се',
    placeholder: 'Предстои в следващите фази.',
  },
  footer: {
    builtWith: 'Изградено с',
    source: 'Код',
    rights: 'Всички права запазени.',
  },
  langSwitch: {
    label: 'Език',
  },
}

export const translations = { en, bg } satisfies Record<Lang, Translations>
