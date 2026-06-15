const CLIENTS = [
  { name: 'Web storefront', host: 'Next.js · Vercel' },
  { name: 'Admin', host: 'Next.js · Vercel' },
]

const SERVICES = [
  { name: 'PostgreSQL', host: 'Neon' },
  { name: 'Redis', host: 'Upstash' },
  { name: 'Search', host: 'Meilisearch' },
  { name: 'Media', host: 'Cloudflare R2' },
]

function Node({ name, host }: { name: string; host: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3 text-center">
      <div className="font-display text-base text-fg">{name}</div>
      <div className="mt-0.5 font-mono text-[11px] text-muted">{host}</div>
    </div>
  )
}

function Connector() {
  return <div aria-hidden className="mx-auto my-3 h-6 w-px bg-line" />
}

/**
 * Themeable topology diagram for the e-commerce platform. Exposed to assistive
 * tech as a single labelled image; the boxes are presentational.
 */
export function ArchitectureDiagram() {
  return (
    <div
      role="img"
      aria-label="Architecture: the Next.js storefront and admin on Vercel both call an Express REST API on Railway, which uses PostgreSQL on Neon, Redis on Upstash, Meilisearch for search, and Cloudflare R2 for media. Monitored by Sentry with GitHub Actions CI and offsite database backups."
      className="rounded-2xl border border-line bg-canvas/40 p-6 sm:p-8"
    >
      <div className="grid grid-cols-2 gap-4">
        {CLIENTS.map((node) => (
          <Node key={node.name} {...node} />
        ))}
      </div>
      <Connector />
      <div className="mx-auto max-w-xs rounded-xl border border-accent/40 bg-accent/5 px-4 py-3 text-center">
        <div className="font-display text-base text-fg">REST API</div>
        <div className="mt-0.5 font-mono text-[11px] text-muted">
          Express · Railway
        </div>
      </div>
      <Connector />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SERVICES.map((node) => (
          <Node key={node.name} {...node} />
        ))}
      </div>
      <p className="mt-6 text-center font-mono text-[11px] text-muted">
        Sentry monitoring · GitHub Actions CI · offsite DB backups
      </p>
    </div>
  )
}
