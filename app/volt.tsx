"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "./content";

// An action's return value becomes Volt's next message (null closes the bubble).
type Action = { label: string; run: () => Message | null };
type Message = { text: string; actions?: Action[] };

// "Hide Volt" preference: localStorage when available, in-memory otherwise.
const HIDDEN_KEY = "volt-hidden";
const listeners = new Set<() => void>();
let hiddenValue: boolean | undefined;

const hiddenStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get() {
    if (hiddenValue === undefined) {
      try {
        hiddenValue = localStorage.getItem(HIDDEN_KEY) === "1";
      } catch {
        hiddenValue = false;
      }
    }
    return hiddenValue;
  },
  // Unknown on the server, so Volt renders nothing until hydrated.
  getServer: () => null,
  set(value: boolean) {
    hiddenValue = value;
    try {
      localStorage.setItem(HIDDEN_KEY, value ? "1" : "0");
    } catch {}
    listeners.forEach((l) => l());
  },
};

const facts = [
  "Fun fact: the first website went live in 1991. It had zero chrome gradients. Tragic.",
  "Fun fact: a 56k modem would download this whole page in about 9 seconds. Worth it.",
  "Fun fact: every image here is a hand-built SVG, so it stays sharp at any zoom.",
  "Fun fact: I run on 100% recycled pixels. ♻",
  "Fun fact: the hit counter is fake, but the enthusiasm is real.",
];

const sectionTips: Record<string, string> = {
  work: "It looks like you're browsing projects! Click any window to open the full case study.",
  about: `${site.name.split(" ")[0]} has 10 years of making the internet shinier. Want to get in touch?`,
  contact: "It looks like you're about to send an email. Would you like help with that? 💌",
};

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return null;
};

const factMessage = (i: number): Message => ({
  text: facts[i % facts.length],
  actions: [{ label: "Another!", run: () => factMessage(i + 1) }],
});

const greeting: Message = {
  text: "Hi! I'm Volt ⚡ It looks like you're browsing a portfolio. Would you like some help?",
  actions: [
    { label: "Show me the work", run: () => scrollTo("work") },
    { label: "Fun fact", run: () => factMessage(0) },
  ],
};

const tipMessage = (id: string): Message => ({
  text: sectionTips[id],
  actions:
    id === "about"
      ? [{ label: "Take me there", run: () => scrollTo("contact") }]
      : id === "contact"
        ? [{ label: "Write an email", run: () => { location.href = `mailto:${site.email}`; return null; } }]
        : undefined,
});

export function Volt() {
  const hidden = useSyncExternalStore(hiddenStore.subscribe, hiddenStore.get, hiddenStore.getServer);
  const [message, setMessage] = useState<Message | null>(null);
  const factIndex = useRef(0);
  const greeted = useRef(false);
  const seen = useRef(new Set<string>());

  const closeBubble = () => setMessage(null);

  // Pop in with a greeting shortly after load (once per page view).
  useEffect(() => {
    if (hidden !== false || greeted.current) return;
    const t = setTimeout(() => {
      greeted.current = true;
      setMessage(greeting);
    }, 2500);
    return () => clearTimeout(t);
  }, [hidden]);

  // Clippy-style context tips: speak up the first time each section scrolls into view.
  useEffect(() => {
    if (hidden !== false) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (!e.isIntersecting || seen.current.has(id)) continue;
          seen.current.add(id);
          setMessage(tipMessage(id));
        }
      },
      { threshold: 0.35 },
    );
    Object.keys(sectionTips).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [hidden]);

  const setHiddenPersist = (value: boolean) => {
    setMessage(null);
    hiddenStore.set(value);
  };

  if (hidden === null) return null;

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => {
          setHiddenPersist(false);
          greeted.current = true;
          setMessage(greeting);
        }}
        className="sticker fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-card px-3 py-1.5 font-pixel text-lg"
        aria-label="Bring back Volt, the assistant"
      >
        <span className="size-2.5 rounded-full bg-pink volt-glow" aria-hidden />
        Volt
      </button>
    );
  }

  return (
    <aside
      aria-label="Volt, site assistant"
      className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5"
    >
      <div aria-live="polite" className="w-[min(18rem,calc(100vw-1.5rem))]">
        {message && (
          <div key={message.text} className="window volt-pop relative">
            <div className="titlebar !py-1">
              <span className="font-pixel text-base leading-none">volt_assistant.exe</span>
              <button
                type="button"
                onClick={closeBubble}
                className="titlebar-btn ml-auto cursor-pointer"
                aria-label="Close message"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className="flex flex-wrap gap-2">
                {message.actions?.map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => setMessage(a.run())}
                    className="btn-chrome px-3 py-1 text-xs font-semibold"
                  >
                    {a.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setHiddenPersist(true)}
                  className="px-2 py-1 text-xs text-muted underline underline-offset-2 hover:text-pink"
                >
                  Hide Volt
                </button>
              </div>
            </div>
            {/* Speech-bubble tail pointing at the robot */}
            <span
              aria-hidden
              className="absolute -bottom-[9px] right-12 size-4 rotate-45 border-b-2 border-r-2 border-line bg-card"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setMessage(message ? null : factMessage(factIndex.current++))}
        aria-label={message ? "Close Volt's message" : "Ask Volt for a fun fact"}
        className="volt-btn volt-float mr-2 cursor-pointer rounded-3xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        <VoltRobot waving={!!message} />
      </button>
    </aside>
  );
}

function VoltRobot({ waving }: { waving: boolean }) {
  return (
    <svg viewBox="0 0 120 140" className="volt-hop h-22 w-19 sm:h-28 sm:w-24 drop-shadow-[0_6px_14px_rgba(255,63,180,0.45)]" aria-hidden>
      <defs>
        <linearGradient id="volt-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#c3c9da" />
          <stop offset=".5" stopColor="#6b7290" />
          <stop offset=".55" stopColor="#eef0f7" />
          <stop offset="1" stopColor="#9aa1b8" />
        </linearGradient>
        <linearGradient id="volt-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a0f4f" />
          <stop offset="1" stopColor="#0b0420" />
        </linearGradient>
        <linearGradient id="volt-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3fb4" />
          <stop offset=".5" stopColor="#7a4dff" />
          <stop offset="1" stopColor="#2fd8ff" />
        </linearGradient>
        <filter id="volt-neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="60" y1="22" x2="60" y2="8" stroke="#160f2b" strokeWidth="3" />
      <circle cx="60" cy="7" r="6" fill="#ff3fb4" filter="url(#volt-neon)" className="volt-glow" />

      {/* Arms (right one waves while talking) */}
      <path d="M22 92 Q 8 100 12 114" fill="none" stroke="#160f2b" strokeWidth="9" strokeLinecap="round" />
      <path d="M22 92 Q 8 100 12 114" fill="none" stroke="url(#volt-chrome)" strokeWidth="5" strokeLinecap="round" />
      <g className={waving ? "volt-wave" : ""} style={{ transformOrigin: "98px 92px" }}>
        <path d="M98 92 Q 114 82 110 66" fill="none" stroke="#160f2b" strokeWidth="9" strokeLinecap="round" />
        <path d="M98 92 Q 114 82 110 66" fill="none" stroke="url(#volt-chrome)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="110" cy="64" r="6" fill="#c8ff3d" stroke="#160f2b" strokeWidth="2.5" />
      </g>

      {/* Body */}
      <rect x="28" y="80" width="64" height="46" rx="18" fill="url(#volt-body)" stroke="#160f2b" strokeWidth="3" />
      <path d="M58 92 l-6 12 h8 l-4 12 12-16 h-8 l4-8z" fill="#c8ff3d" stroke="#160f2b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M36 88 Q 40 84 48 84" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />

      {/* Feet */}
      <rect x="36" y="124" width="18" height="10" rx="5" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="66" y="124" width="18" height="10" rx="5" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="2.5" />

      {/* Head */}
      <rect x="14" y="20" width="92" height="64" rx="24" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="3" />
      <rect x="6" y="40" width="10" height="22" rx="5" fill="#ff3fb4" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="104" y="40" width="10" height="22" rx="5" fill="#ff3fb4" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="24" y="32" width="72" height="40" rx="16" fill="url(#volt-visor)" stroke="#160f2b" strokeWidth="2.5" />

      {/* Neon face: resting */}
      <g className="volt-face-rest">
        <g filter="url(#volt-neon)" className="volt-blink" style={{ transformOrigin: "60px 48px" }}>
          <rect x="38" y="41" width="10" height="14" rx="5" fill="#2fd8ff" />
          <rect x="72" y="41" width="10" height="14" rx="5" fill="#2fd8ff" />
        </g>
        <path d="M50 62 Q 60 69 70 62" fill="none" stroke="#c8ff3d" strokeWidth="3" strokeLinecap="round" filter="url(#volt-neon)" />
      </g>

      {/* Neon face: happy (shown on hover / keyboard focus) */}
      <g className="volt-face-happy">
        <g fill="none" stroke="#2fd8ff" strokeWidth="4" strokeLinecap="round" filter="url(#volt-neon)">
          <path d="M37 52 Q 43 40 49 52" />
          <path d="M71 52 Q 77 40 83 52" />
        </g>
        <path d="M47 59 Q 60 74 73 59 Z" fill="#c8ff3d" stroke="#c8ff3d" strokeWidth="2" strokeLinejoin="round" filter="url(#volt-neon)" />
        <path d="M54 65 Q 60 69 66 65" fill="#ff3fb4" />
        <ellipse cx="33" cy="60" rx="5" ry="3" fill="#ff3fb4" opacity=".8" />
        <ellipse cx="87" cy="60" rx="5" ry="3" fill="#ff3fb4" opacity=".8" />
      </g>

      <path d="M26 36 Q 34 30 46 31" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".35" />

      {/* Happy sparkles */}
      <g className="volt-face-happy" fill="#c8ff3d" stroke="#160f2b" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M8 18 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" />
        <path d="M104 10 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z" fill="#ff3fb4" />
      </g>
    </svg>
  );
}
