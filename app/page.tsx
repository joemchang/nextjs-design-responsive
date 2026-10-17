import { projects, services, site } from "./content";
import { ThemeToggle } from "./theme-toggle";
import { Volt } from "./volt";
import { WorkGrid } from "./work-grid";

const tickerItems = [
  "Now booking spring 2027",
  "Best viewed in any browser",
  "Branding · Digital · Illustration",
  "You've got mail",
  "Sign my guestbook",
  "Est. 1999 (spiritually)",
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
    </svg>
  );
}

function Ticker() {
  const row = tickerItems.flatMap((t) => [t, "★"]);
  return (
    <div className="overflow-hidden border-y-2 border-line bg-lime text-[#160f2b]" aria-hidden>
      <div className="marquee-track py-2">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="font-pixel text-2xl uppercase px-4 whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function HitCounter() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-pixel text-lg text-muted uppercase">Visitors</span>
      <span className="flex gap-0.5" aria-label="4,213 visitors">
        {"004213".split("").map((d, i) => (
          <span
            key={i}
            className="grid h-8 w-6 place-items-center rounded-sm bg-[#160f2b] font-pixel text-2xl text-lime"
          >
            {d}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main"
          className="window mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 !shadow-[4px_4px_0_var(--shadow)] bg-card/85 backdrop-blur-md"
        >
          <a href="#top" className="flex items-center gap-2 font-pixel text-2xl leading-none">
            <Sparkle className="size-5 text-pink spin-slow" />
            {site.handle}
          </a>
          <span className="hidden items-center gap-2 text-sm text-muted sm:flex">
            <span className="size-2 rounded-full bg-[#3dff8a] blink" aria-hidden />
            online
          </span>
          <ul className="ml-auto flex items-center gap-1 text-sm font-medium sm:gap-2">
            {["Work", "About"].map((l) => (
              <li key={l} className="hidden min-[440px]:block">
                <a href={`#${l.toLowerCase()}`} className="rounded-full px-3 py-1.5 hover:bg-lime hover:text-[#160f2b]">
                  {l}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="rounded-full bg-ink px-3 py-1.5 text-paper hover:bg-pink hover:text-white">
                Contact
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_22rem]">
            <div className="relative">
              <p className="mb-6 inline-flex items-center gap-2 sticker bg-card px-4 py-1.5 text-sm">
                <Sparkle className="size-3.5 text-violet" />
                {site.role} · {site.location}
              </p>
              <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] tracking-tight">
                Designing <span className="chrome-text italic">shiny</span>
                <br />
                things for the <span className="iridescent-text italic">new</span>
                <br />
                old internet.
              </h1>
              <span className="sticker absolute -right-1 top-6 hidden rotate-12 bg-pink px-4 py-2 font-pixel text-2xl text-white sm:block lg:right-6">
                NEW!
              </span>
            </div>

            <div className="window">
              <div className="titlebar">
                <span className="font-pixel text-lg leading-none">about_me.txt</span>
                <span className="ml-auto flex gap-1" aria-hidden>
                  <span className="titlebar-btn">_</span>
                  <span className="titlebar-btn">×</span>
                </span>
              </div>
              <div className="space-y-5 p-5">
                <p className="leading-relaxed">
                  Hi! I&apos;m {site.name.split(" ")[0]}. I make brands, websites, and illustrations
                  that bring the optimism of early-2000s web into the present: chrome, gloss,
                  and a little chaos, all on a solid modern grid.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#work" className="btn-chrome px-5 py-2.5 text-sm font-semibold">
                    View work <span aria-hidden>↓</span>
                  </a>
                  <a href={`mailto:${site.email}`} className="text-sm font-medium underline decoration-pink decoration-2 underline-offset-4 hover:text-pink">
                    Say hi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Ticker />

        {/* Work */}
        <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-6xl leading-none sm:text-7xl">
              Selected <span className="italic text-pink">work</span>
            </h2>
            <p className="font-pixel text-xl text-muted">C:\portfolio\2024–2026</p>
          </div>
          <WorkGrid projects={projects} />
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 border-y-2 border-line bg-card">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-6xl leading-none sm:text-7xl">
                Nostalgia, <span className="italic">but make it</span>{" "}
                <span className="chrome-text italic">useful</span>.
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
                Ten years across studios and in-house teams. I borrow the fun of the Y2K web,
                like candy buttons, sparkle cursors, and holographic everything, and pair it with
                accessible, fast, well-built design. The vibe is 1999 and the craft is current.
              </p>
              <div className="mt-8">
                <HitCounter />
              </div>
            </div>

            <div className="window self-start">
              <div className="titlebar">
                <span className="font-pixel text-lg leading-none">services.exe</span>
              </div>
              <ul className="divide-y-2 divide-line/15">
                {services.map((s, i) => (
                  <li key={s} className="flex items-center gap-4 px-5 py-4">
                    <span className="font-pixel text-xl text-pink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-medium">{s}</span>
                    <Sparkle className="ml-auto size-4 text-violet" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 text-center sm:px-6">
          <p className="font-pixel text-2xl text-pink uppercase">
            <span className="blink" aria-hidden>▶ </span>
            {site.availability}
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9]">
            Let&apos;s make something <span className="iridescent-text italic">sparkly</span>.
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="btn-chrome mt-10 px-7 py-4 text-lg font-semibold break-all"
          >
            <span aria-hidden>✉</span> {site.email}
          </a>
        </section>
      </main>

      <footer>
        <div className="construction h-3" aria-hidden />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-pixel text-lg">made with &lt;3 and a 56k modem</p>
        </div>
      </footer>

      <Volt />
    </>
  );
}
