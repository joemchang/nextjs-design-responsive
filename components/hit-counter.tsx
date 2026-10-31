export type HitCounterProps = {
  label: string;
  count: number;
  /** Zero-padded width of the display. */
  digits?: number;
};

export function HitCounter({ label, count, digits = 6 }: HitCounterProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-pixel text-lg text-muted uppercase">{label}</span>
      <span
        className="flex gap-0.5"
        aria-label={`${count.toLocaleString("en-US")} ${label.toLowerCase()}`}
      >
        {String(count).padStart(digits, "0").split("").map((d, i) => (
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
