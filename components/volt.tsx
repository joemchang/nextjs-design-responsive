"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export type VoltAction =
  | { label: string; kind: "scroll"; target: string }
  | { label: string; kind: "fact" }
  | { label: string; kind: "mailto"; email: string };

export type VoltTip = { text: string; action?: VoltAction };

export type VoltProps = {
  /** Shown on the "bring back" button once hidden. */
  name: string;
  /** Window title of the speech bubble. */
  windowTitle: string;
  greeting: { text: string; actions: VoltAction[] };
  /** Said one at a time, cycling, when asking for a fact. */
  facts: string[];
  /** Section-id → tip, spoken the first time that section scrolls into view. */
  tips: Record<string, VoltTip>;
  /** Mascot artwork; the parent sets `data-waving="true"` on it while Volt is talking. */
  avatar: ReactNode;
  /** Label of the follow-up action after a fact. */
  nextFactLabel: string;
  hideLabel: string;
  labels: {
    region: string;
    bringBack: string;
    closeMessage: string;
    askForFact: string;
    closeBubble: string;
  };
  greetingDelayMs?: number;
};

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

export function Volt({
  name,
  windowTitle,
  greeting,
  facts,
  tips,
  avatar,
  nextFactLabel,
  hideLabel,
  labels,
  greetingDelayMs = 2500,
}: VoltProps) {
  const hidden = useSyncExternalStore(hiddenStore.subscribe, hiddenStore.get, hiddenStore.getServer);
  const [message, setMessage] = useState<Message | null>(null);
  const factIndex = useRef(0);
  const greeted = useRef(false);
  const seen = useRef(new Set<string>());

  // An action's return value becomes Volt's next message (null closes the bubble).
  const factMessage = (i: number): Message => ({
    text: facts[i % facts.length],
    actions: [{ label: nextFactLabel, run: () => factMessage(i + 1) }],
  });

  const toAction = (a: VoltAction): Action => ({
    label: a.label,
    run: () => {
      if (a.kind === "scroll") {
        document.getElementById(a.target)?.scrollIntoView({ behavior: "smooth" });
        return null;
      }
      if (a.kind === "mailto") {
        location.href = `mailto:${a.email}`;
        return null;
      }
      return factMessage(0);
    },
  });

  const greetingMessage = (): Message => ({
    text: greeting.text,
    actions: greeting.actions.map(toAction),
  });

  const tipMessage = (id: string): Message => ({
    text: tips[id].text,
    actions: tips[id].action ? [toAction(tips[id].action)] : undefined,
  });

  const closeBubble = () => setMessage(null);

  // Pop in with a greeting shortly after load (once per page view).
  useEffect(() => {
    if (hidden !== false || greeted.current) return;
    const t = setTimeout(() => {
      greeted.current = true;
      setMessage(greetingMessage());
    }, greetingDelayMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    Object.keys(tips).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setMessage(greetingMessage());
        }}
        className="sticker fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-card px-3 py-1.5 font-pixel text-lg"
        aria-label={labels.bringBack}
      >
        <span className="size-2.5 rounded-full bg-pink volt-glow" aria-hidden />
        {name}
      </button>
    );
  }

  return (
    <aside
      aria-label={labels.region}
      className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5"
    >
      <div aria-live="polite" className="w-[min(18rem,calc(100vw-1.5rem))]">
        {message && (
          <div key={message.text} className="window volt-pop relative">
            <div className="titlebar !py-1">
              <span className="font-pixel text-base leading-none">{windowTitle}</span>
              <button
                type="button"
                onClick={closeBubble}
                className="titlebar-btn ml-auto cursor-pointer"
                aria-label={labels.closeMessage}
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
                  {hideLabel}
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
        aria-label={message ? labels.closeBubble : labels.askForFact}
        data-waving={!!message}
        className="volt-btn volt-float mr-2 cursor-pointer rounded-3xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        {avatar}
      </button>
    </aside>
  );
}
