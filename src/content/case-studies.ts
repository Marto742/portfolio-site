import type { Lang } from '../i18n/translations'
import type { ProjectSlug } from './projects'

export interface CaseStudySection {
  heading: string
  body: string[]
}

export interface CaseStudyContent {
  intro: string
  sections: CaseStudySection[]
}

/**
 * Long-form, verified case-study copy. Kept out of translations.ts to keep the
 * UI dictionary lean. Indexed by language then project slug.
 */
export const CASE_STUDIES: Record<
  Lang,
  Record<ProjectSlug, CaseStudyContent>
> = {
  en: {
    ecommerce: {
      intro:
        'A production-grade e-commerce platform built as a Turborepo monorepo: a customer storefront, an admin dashboard, and a REST API, sharing typed packages for the database, UI and validation. It runs live across six providers.',
      sections: [
        {
          heading: 'Architecture',
          body: [
            'Three apps, one API. The Next.js storefront and admin both talk to an Express REST API that owns the data layer — PostgreSQL through Prisma, Redis for caching and rate limiting, Meilisearch for search, and Cloudflare R2 for media.',
            'Each piece is deployed where it fits best: the front-ends on Vercel, the API on Railway, Postgres on Neon, Redis on Upstash. Sentry watches errors, and a readiness endpoint plus offsite database backups keep it operable.',
          ],
        },
        {
          heading: 'Engineering decisions',
          body: [
            'Shared packages (database, UI, validation, config) keep the three apps consistent — one Zod schema validates a request on the API and the matching form on the web.',
            'Auth is JWT with short-lived access tokens and rotating refresh tokens. Every environment variable is validated with Zod at startup, so the server fails loud and early instead of misbehaving in production. Redis-backed rate limiting protects the API, and Stripe handles checkout via webhooks.',
          ],
        },
        {
          heading: 'Testing & CI',
          body: [
            'Around 150 tests span unit, integration and end-to-end — Vitest and Supertest for the API, Playwright for the apps — plus axe accessibility checks, visual-regression specs, Artillery load tests and a security self-assessment.',
            'Coverage gates enforce 80%+ on the backend; the web app sits at 93% and admin at 100%. GitHub Actions runs lint, type-check, the full suite against a real Postgres + Redis, and a build on every push.',
          ],
        },
      ],
    },
    'simon-says': {
      intro:
        'A hardware take on the classic memory game — C++ firmware on an Arduino Uno R3, with an I2C LCD, persistent high scores, and a buzzer that plays in key.',
      sections: [
        {
          heading: 'What it does',
          body: [
            'Watch the growing sequence, then repeat it on four buttons. Each round adds a step and speeds up — down to a 150 ms floor — and clearing round 15 triggers the win.',
            'The 1602 LCD shows the live round, score and all-time high score; four LEDs and the buzzer drive the sequence.',
          ],
        },
        {
          heading: 'Embedded details',
          body: [
            "The high score lives in EEPROM and is written only when it's beaten, to spare the limited write cycles. Button input is debounced with edge detection, so a single press never double-fires.",
            'Audio is more than beeps: each direction is a note in A minor (E5/A4/E4/C5), with a startup jingle, an ascending win melody and a descending game-over sweep.',
          ],
        },
        {
          heading: 'Hardware',
          body: [
            'Arduino Uno R3, a 1602 LCD on an I2C backpack, four buttons, four LEDs and a passive buzzer on a breadboard. The demo video shows a full play-through.',
          ],
        },
      ],
    },
    domsenz: {
      intro:
        'A Bulgarian smart-home startup — not a side project. A five-year plan, a brand, and a live pre-launch presence that ties my software and hardware together.',
      sections: [
        {
          heading: 'The idea',
          body: [
            'DomSenz is a company, not a hobby: smart-home hardware and software built for the Bulgarian market, where I can use both sides of what I do — the devices and the platform around them.',
          ],
        },
        {
          heading: "What's live",
          body: [
            'The pre-launch landing is shipped and live — a static Vite site on Cloudflare Workers with a Formspree waitlist and a social-proof counter, proper Open Graph cards, and automatic deploys on every push.',
          ],
        },
        {
          heading: "What's next",
          body: [
            'Firmware for the first device, Climate-Sens, is in early development, and the domsens.bg domain is on the way. The landing exists to start building an audience before launch.',
          ],
        },
      ],
    },
  },
  bg: {
    ecommerce: {
      intro:
        'Production-grade e-commerce платформа, изградена като Turborepo монорепо: магазин за клиенти, админ панел и REST API, които споделят типизирани пакети за базата, UI и валидацията. Работи на живо през шест доставчика.',
      sections: [
        {
          heading: 'Архитектура',
          body: [
            'Три приложения, едно API. Next.js магазинът и админът говорят с Express REST API, което владее слоя с данни — PostgreSQL през Prisma, Redis за кеш и rate limiting, Meilisearch за търсене и Cloudflare R2 за медия.',
            'Всяка част е деплойната там, където пасва: фронтендите на Vercel, API-то на Railway, Postgres на Neon, Redis на Upstash. Sentry следи грешките, а readiness endpoint и offsite бекъпи на базата я държат работеща.',
          ],
        },
        {
          heading: 'Инженерни решения',
          body: [
            'Споделените пакети (база, UI, валидация, конфигурация) държат трите приложения консистентни — една Zod схема валидира заявката в API-то и съответната форма в уеба.',
            'Автентикацията е JWT с кратки access токени и ротиращи refresh токени. Всяка environment променлива се валидира със Zod при старт, така че сървърът спира шумно и рано, вместо да се чупи в production. Rate limiting през Redis пази API-то, а Stripe обработва checkout през webhooks.',
          ],
        },
        {
          heading: 'Тестове и CI',
          body: [
            'Около 150 теста покриват unit, integration и end-to-end — Vitest и Supertest за API-то, Playwright за приложенията — плюс axe проверки за достъпност, visual-regression тестове, Artillery load тестове и security самооценка.',
            'Праговете за покритие изискват 80%+ на бекенда; уеб приложението е на 93%, а админът на 100%. GitHub Actions пуска lint, type-check, целия пакет срещу истински Postgres + Redis и билд при всеки push.',
          ],
        },
      ],
    },
    'simon-says': {
      intro:
        'Хардуерна версия на класическата игра на паметта — C++ фърмуер върху Arduino Uno R3, с I2C LCD, постоянни рекорди и бъзер, който свири в тоналност.',
      sections: [
        {
          heading: 'Какво прави',
          body: [
            'Гледаш нарастващата последователност и я повтаряш на четири бутона. Всеки рунд добавя стъпка и ускорява — до под 150 ms — а преминаването на рунд 15 носи победата.',
            '1602 LCD показва текущия рунд, точките и рекорда за всички времена; четири LED-а и бъзерът водят последователността.',
          ],
        },
        {
          heading: 'Embedded детайли',
          body: [
            'Рекордът живее в EEPROM и се записва само когато е подобрен, за да пести ограничените цикли на запис. Входът от бутоните е debounced с edge detection, така че едно натискане никога не се отчита двойно.',
            'Звукът е повече от бипкане: всяка посока е нота в ла минор (E5/A4/E4/C5), със стартов джингъл, възходяща мелодия при победа и низходящ звук при загуба.',
          ],
        },
        {
          heading: 'Хардуер',
          body: [
            'Arduino Uno R3, 1602 LCD на I2C, четири бутона, четири LED-а и пасивен бъзер на breadboard. Видеото показва цяло изиграване.',
          ],
        },
      ],
    },
    domsenz: {
      intro:
        'Български smart-home стартъп — не страничен проект. Петгодишен план, бранд и жива pre-launch презентация, която свързва софтуера и хардуера ми.',
      sections: [
        {
          heading: 'Идеята',
          body: [
            'ДомСенз е компания, не хоби: smart-home хардуер и софтуер за българския пазар, където мога да използвам и двете страни на това, което правя — устройствата и платформата около тях.',
          ],
        },
        {
          heading: 'Какво е на живо',
          body: [
            'Pre-launch landing-ът е завършен и на живо — статичен Vite сайт на Cloudflare Workers с Formspree waitlist и брояч за social proof, коректни Open Graph картички и автоматичен деплой при всеки push.',
          ],
        },
        {
          heading: 'Какво предстои',
          body: [
            'Фърмуерът за първото устройство, Климат сенз, е в ранна разработка, а домейнът domsens.bg е на път. Landing-ът съществува, за да започне да гради аудитория преди старта.',
          ],
        },
      ],
    },
  },
}
