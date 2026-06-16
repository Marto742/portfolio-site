export type SkillGroupId = 'frontend' | 'backend' | 'embedded' | 'tooling'

export interface SkillGroup {
  id: SkillGroupId
  items: string[]
}

/**
 * Honest skill list — only things actually used in the shipped projects
 * (verified against the e-commerce monorepo and the Arduino firmware).
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Router'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Zod'],
  },
  {
    id: 'embedded',
    items: ['C++', 'Arduino', 'Microcontrollers', 'I2C', 'EEPROM'],
  },
  {
    id: 'tooling',
    items: ['Git', 'GitHub Actions', 'Vitest', 'Playwright', 'Turborepo'],
  },
]
