"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Also read by the inline script in layout.tsx; keep in sync.
const THEME_KEY = "theme";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

// The effective theme: an explicit data-theme (set by the toggle or the
// pre-paint script in layout.tsx) wins, otherwise the OS preference.
function getTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return media().matches ? "dark" : "light";
}

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  const mq = media();
  mq.addEventListener("change", cb);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", cb);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);
  const dark = theme === "dark";

  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      disabled={theme === null}
      className="relative flex h-8 w-15 shrink-0 cursor-pointer items-center justify-between rounded-full border-2 border-line bg-[linear-gradient(90deg,#ffe86b,#ff8ad9)] px-1.5 text-xs dark:bg-[linear-gradient(90deg,#3b0a6b,#0b2a8f)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink"
    >
      <span aria-hidden className="leading-none">☀</span>
      <span aria-hidden className="leading-none text-white">☾</span>
      {/* Chrome knob slides over the inactive icon */}
      <span
        aria-hidden
        className={`absolute top-0.5 size-6 rounded-full border-2 border-[#160f2b] bg-[image:var(--chrome)] shadow-[0_0_10px_var(--pink)] transition-[left] duration-200 ${
          theme === null ? "opacity-0" : ""
        } ${dark ? "left-0.5" : "left-[calc(100%-1.625rem)]"}`}
      />
    </button>
  );
}
