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
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY >= window.innerHeight
  )

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header — hidden until the first viewport has passed. Still in the DOM for machines. */}
      <header
        aria-hidden={!scrolled ? true : undefined}
        className={`fixed left-1/2 top-0 z-50 flex w-full max-w-[860px] -translate-x-1/2 items-baseline justify-between border-b border-line bg-bg/90 px-6 py-4 backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out ${
          scrolled
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#top"
          tabIndex={scrolled ? 0 : -1}
          className="mono text-[13px] font-medium tracking-[0.32em] transition-colors hover:text-accent"
        >
          ZRVX
        </a>
        <div className="mono flex items-baseline gap-5 text-[11px] text-faint">
          <span className="tracking-[0.18em]">EXPERIMENT / 2026</span>
          <button
            type="button"
            tabIndex={scrolled ? 0 : -1}
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
        <section className="min-h-screen pt-24 pb-24 sm:pt-32 sm:pb-32">
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
        <Section label="The idea" className="min-h-screen">
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
        <Section label="Two kinds of users" className="min-h-screen">
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
        <section className="min-h-screen border-t border-line py-28 sm:py-40">
          <p className="text-[clamp(2.2rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Humans are the audience.
            <br />
            <span className="text-secondary">Machines are the customers.</span>
          </p>
        </section>

        {/* 6 — EARLY STATUS */}
        <Section label="Status" className="min-h-screen">
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

      {/* Floating advance button */}
      <button
        type="button"
        aria-label="Next section"
        onClick={() => {
          const targets = Array.from(document.querySelectorAll('main section, footer'))
          const current = targets.findIndex((t) => {
            const rect = t.getBoundingClientRect()
            return rect.top <= 0 && rect.bottom > 0
          })
          const nextIndex = current + 1 < targets.length ? current + 1 : 0
          const next = targets[nextIndex]
          const margin = parseInt(window.getComputedStyle(next).scrollMarginTop || '0', 10)
          window.scrollTo({ top: next.offsetTop + margin, behavior: 'smooth' })
        }}
        className="fixed bottom-6 right-6 z-40 border border-line-strong bg-bg/90 px-3 py-3 text-faint backdrop-blur-sm transition hover:border-fg hover:text-fg"
      >
        <span className="text-[13px]">↓</span>
      </button>
    </div>
  )
}
