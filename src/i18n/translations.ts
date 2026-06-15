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
    lead: 'Self-taught at 17 — I build production web platforms and real embedded hardware, from zero to shipped.',
    viewWork: 'View projects',
    getInTouch: 'Get in touch',
    location: 'Plovdiv, Bulgaria · Available for work',
    scroll: 'Scroll',
  },
  about: {
    heading: "I taught myself to build — and I didn't stop at code.",
    paragraphs: [
      "I'm Martin, a 17-year-old developer from Plovdiv, Bulgaria. I started from zero — no bootcamp, no degree — and learned by shipping real things.",
      'On the software side I build and run production web platforms end to end: React frontends, Node APIs, databases, payments, tests, monitoring, deploys. On the hardware side I write C++ firmware for microcontrollers — real circuits, real constraints.',
      "That combination is the point. Most developers pick one lane; I work the whole stack, from the silicon to the screen — and I'm turning it into a company: DomSenz, a Bulgarian smart-home startup.",
    ],
    pillars: [
      {
        title: 'Self-taught, from zero',
        body: 'No shortcuts. Everything here I learned by building it.',
      },
      {
        title: 'Software + hardware',
        body: 'Production web systems and real embedded devices.',
      },
      {
        title: 'I ship',
        body: 'Tested, deployed, and live — not slideware.',
      },
    ],
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
    lead: 'Самоук на 17 — изграждам production уеб платформи и истински embedded хардуер, от нула до завършено.',
    viewWork: 'Виж проектите',
    getInTouch: 'Свържи се',
    location: 'Пловдив, България · Свободен за работа',
    scroll: 'Надолу',
  },
  about: {
    heading: 'Научих се да градя сам — и не спрях при кода.',
    paragraphs: [
      'Аз съм Мартин, на 17 от Пловдив. Започнах от нула — без курсове, без диплома — и се научих, като градя реални неща.',
      'От страната на софтуера изграждам и поддържам production уеб платформи изцяло сам: React фронтенд, Node API-та, бази данни, плащания, тестове, мониторинг, деплойменти. От страната на хардуера пиша C++ фърмуер за микроконтролери — истински схеми, истински ограничения.',
      'Точно тази комбинация е смисълът. Повечето избират едно платно; аз работя целия стек, от силиция до екрана — и го превръщам в компания: ДомСенз, български smart-home стартъп.',
    ],
    pillars: [
      {
        title: 'Самоук, от нула',
        body: 'Без преки пътища. Всичко тук съм научил, като съм го построил.',
      },
      {
        title: 'Софтуер + хардуер',
        body: 'Production уеб системи и истински embedded устройства.',
      },
      {
        title: 'Завършвам нещата',
        body: 'Тествано, деплойнато и на живо — не само демота.',
      },
    ],
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
