"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Category, Project } from "./content";

const filters: ("All" | Category)[] = [
  "All",
  "Branding",
  "Digital",
  "Illustration",
  "Packaging",
];

const sizeClasses = {
  hero: "md:col-span-2 lg:row-span-2",
  wide: "md:col-span-2",
  single: "",
};

function TitleBar({ file }: { file: string }) {
  return (
    <div className="titlebar">
      <span className="font-pixel text-lg leading-none truncate">{file}</span>
      <span className="ml-auto flex gap-1" aria-hidden>
        <span className="titlebar-btn">_</span>
        <span className="titlebar-btn">□</span>
        <span className="titlebar-btn">×</span>
      </span>
    </div>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const active = open === null ? null : visible[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  const step = (dir: 1 | -1) =>
    setOpen((i) => (i === null ? i : (i + dir + visible.length) % visible.length));

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2 mb-8"
      >
        {filters.map((f) => {
          const count =
            f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const selected = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f)}
              className={`sticker px-4 py-1.5 text-sm font-medium transition-colors ${
                selected ? "bg-ink text-paper" : "bg-card hover:bg-lime hover:text-[#160f2b]"
              }`}
            >
              {f} <span className="font-pixel text-base opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[360px] grid-flow-dense">
        {visible.map((p, i) => {
          const size = filter === "All" ? (p.size ?? "single") : "single";
          return (
            <li key={p.slug} className={sizeClasses[size]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="window group flex h-full w-full flex-col text-left transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--shadow)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink"
              >
                <TitleBar file={p.file} />
                <div
                  className={`relative w-full overflow-hidden border-b-2 border-line aspect-[4/5] lg:aspect-auto lg:flex-1 ${
                    size !== "single" ? "md:aspect-[16/10]" : ""
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i < 2}
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl leading-tight truncate">{p.title}</h3>
                    <p className="text-sm text-muted">
                      {p.category} · {p.year}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border-2 border-line transition-colors group-hover:bg-pink group-hover:text-white"
                  >
                    ↗
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-labelledby="lightbox-title"
        className="window m-auto w-[min(92vw,960px)] max-h-[92vh] bg-card text-ink p-0 backdrop:bg-[#160f2b]/70 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="flex max-h-[92vh] flex-col">
            <div className="titlebar">
              <span className="font-pixel text-lg leading-none truncate">
                {active.file} — {open! + 1}/{visible.length}
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="titlebar-btn ml-auto cursor-pointer"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="grid min-h-0 overflow-auto md:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[4/5] border-b-2 border-line md:border-b-0 md:border-r-2">
                <Image src={active.image} alt={active.alt} fill sizes="(min-width: 768px) 520px, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <p className="font-pixel text-xl text-pink">
                  {active.category} / {active.year}
                </p>
                <h3 id="lightbox-title" className="font-display text-5xl leading-none">
                  {active.title}
                </h3>
                <p className="text-muted leading-relaxed">{active.blurb}</p>
                <div className="mt-auto flex gap-3 pt-4">
                  <button type="button" onClick={() => step(-1)} className="btn-chrome px-5 py-2 text-sm font-semibold">
                    ← Prev
                  </button>
                  <button type="button" onClick={() => step(1)} className="btn-chrome px-5 py-2 text-sm font-semibold">
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
