import { useEffect, useState, type ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/* ZRVX — early exploration of a machine-to-machine economy.          */
/* "Built for machines. Unfortunately visible to humans."             */
/*                                                                     */
/* Nothing is built yet; the page communicates the idea, not a         */
/* product. Human layer → elegant sans. Machine layer → .mono labels.  */
/* Playful in expression. Precise in behavior. ZRVX never lies.        */
/* ------------------------------------------------------------------ */

/* Placeholder links — replace when real destinations exist. */
const LINKS = {
  follow: '#follow',
  github: 'https://github.com/zrvx-nwrk',
  contact: 'mailto:hello@zrvx.dev',
}

/* ---------- primitives ---------- */

function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`mono text-[11px] font-medium uppercase tracking-[0.22em] text-faint ${className}`}
    >
      {children}
    </span>
  )
}

function Section({
  label,
  children,
  className = '',
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`border-t border-line py-20 sm:py-28 ${className}`}>
      {label ? <Label className="mb-8 block">{label}</Label> : null}
      {children}
    </section>
  )
}

/* ================================================================== */

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('zrvx-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('zrvx-theme', theme)
  }, [theme])

  useEffect(() => {
    console.log(
      '%cZRVX%c\nBuilt for machines.\nUnfortunately visible to humans.\nIf you can read this, you are probably a human.',
      'color: var(--accent); font-weight: 600; font-size: 14px;',
      'color: inherit; font-size: 12px;'
    )
  }, [])

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[860px] items-baseline justify-between px-6 pt-8">
        <a
          href="#top"
          className="mono text-[13px] font-medium tracking-[0.32em] transition-colors hover:text-accent"
        >
          ZRVX
        </a>
        <div className="mono flex items-baseline gap-5 text-[11px] text-faint">
          <span className="tracking-[0.18em]">EXPERIMENT / 2026</span>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="uppercase tracking-[0.16em] hover:text-fg"
          >
            {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-[860px] px-6">
        {/* 1 — HERO */}
        <section className="pt-24 pb-24 sm:pt-32 sm:pb-32">
          <Label className="mb-10 block">Early exploration</Label>
          <h1 className="text-[clamp(3.5rem,14vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            ZRVX
          </h1>
          <p className="mt-10 max-w-[20ch] text-[clamp(1.6rem,4.5vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            Built for machines.{' '}
            <span className="text-secondary">Unfortunately visible to humans.</span>
          </p>
          <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-secondary">
            ZRVX is exploring an open protocol for machine-to-machine commerce,
            where software can discover services, negotiate, pay, and transact
            with other machines.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={LINKS.github}
              className="mono border border-line-strong px-5 py-2.5 text-[13px] transition-colors hover:border-fg"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* 2 — THE IDEA */}
        <Section label="The idea">
          <h2 className="max-w-[24ch] text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Humans built the internet. What happens when machines start using it
            to buy things?
          </h2>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-secondary">
            Software can already call APIs. The next step is giving machines a way
            to discover capabilities, compare options, negotiate terms, and
            exchange value — without requiring a human at every step.
          </p>
        </Section>

        {/* 3 — HUMAN / MACHINE CONTRAST */}
        <Section label="Two kinds of users">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line max-[560px]:grid-cols-1">
            <div className="bg-bg p-8 sm:p-10">
              <Label>Humans</Label>
              <ul className="mt-6 space-y-2 text-[clamp(1.1rem,2.5vw,1.4rem)] font-medium tracking-[-0.01em]">
                <li>curious</li>
                <li>opinionated</li>
                <li>expensive</li>
                <li className="text-secondary">needs coffee</li>
              </ul>
            </div>
            <div className="bg-bg p-8 sm:p-10">
              <Label>Machines</Label>
              <ul className="mono mt-6 space-y-2 text-[clamp(1.1rem,2.5vw,1.4rem)] tracking-tight">
                <li>discover</li>
                <li>compare</li>
                <li>execute</li>
                <li className="text-accent">repeat</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 4 — PRINCIPLE (strongest moment) */}
        <section className="border-t border-line py-28 sm:py-40">
          <p className="text-[clamp(2.2rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Humans are the audience.
            <br />
            <span className="text-secondary">Machines are the customers.</span>
          </p>
        </section>

        {/* 6 — EARLY STATUS */}
        <Section label="Status">
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Nothing to use yet.
          </h2>
          <p className="mt-4 text-[17px] text-secondary">
            We’re building the foundation.
          </p>

          {/* Conceptual arc — not a roadmap, no dates, no promises. */}
          <ol className="mono mt-12 space-y-0 text-[13px]">
            {[
              { step: 'idea', note: 'you are here' },
              { step: 'protocol', note: '' },
              { step: 'services', note: '' },
              { step: 'machine economy', note: '' },
            ].map((s, i, arr) => (
              <li key={s.step}>
                <div className="flex items-baseline gap-4 py-1.5">
                  <span className="w-6 text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={
                      i === 0 ? 'uppercase tracking-[0.16em] text-fg' : 'uppercase tracking-[0.16em] text-secondary'
                    }
                  >
                    {s.step}
                  </span>
                  {s.note ? (
                    <span className="text-faint">— {s.note}</span>
                  ) : null}
                </div>
                {i < arr.length - 1 ? (
                  <div aria-hidden className="ml-[0.5rem] h-5 w-px bg-line-strong" />
                ) : null}
              </li>
            ))}
          </ol>
        </Section>
      </main>

      {/* 7 — FOOTER */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[860px] flex-wrap items-end justify-between gap-8 px-6 py-14">
          <div>
            <p className="mono text-[13px] font-medium tracking-[0.32em]">ZRVX</p>
            <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-secondary">
              Built for machines. <br />Unfortunately visible to humans.
            </p>
          </div>
          <nav aria-label="Footer" className="mono flex flex-col gap-2 text-[13px]">
            <a href={LINKS.github} className="text-secondary hover:text-fg">
              GitHub ↗
            </a>
            <a href={LINKS.contact} className="text-secondary hover:text-fg">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
