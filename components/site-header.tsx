import type { ReactNode } from "react";
import { Sparkle } from "./sparkle";

export type NavLink = { label: string; href: string };

export type SiteHeaderProps = {
  brand: string;
  brandHref: string;
  navLabel: string;
  statusLabel?: string;
  links: NavLink[];
  cta: NavLink;
  /** Rendered at the end of the bar, e.g. a theme toggle. */
  children?: ReactNode;
};

export function SiteHeader({
  brand,
  brandHref,
  navLabel,
  statusLabel,
  links,
  cta,
  children,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <nav
        aria-label={navLabel}
        className="window mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 !shadow-[4px_4px_0_var(--shadow)] bg-card/85 backdrop-blur-md"
      >
        <a href={brandHref} className="flex items-center gap-2 font-pixel text-2xl leading-none">
          <Sparkle className="size-5 text-pink spin-slow" />
          {brand}
        </a>
        {statusLabel && (
          <span className="hidden items-center gap-2 text-sm text-muted sm:flex">
            <span className="size-2 rounded-full bg-[#3dff8a] blink" aria-hidden />
            {statusLabel}
          </span>
        )}
        <ul className="ml-auto flex items-center gap-1 text-sm font-medium sm:gap-2">
          {links.map((l) => (
            <li key={l.href} className="hidden min-[440px]:block">
              <a href={l.href} className="rounded-full px-3 py-1.5 hover:bg-lime hover:text-[#160f2b]">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={cta.href} className="rounded-full bg-ink px-3 py-1.5 text-paper hover:bg-pink hover:text-white">
              {cta.label}
            </a>
          </li>
        </ul>
        {children}
      </nav>
    </header>
  );
}
