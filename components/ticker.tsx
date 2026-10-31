export type TickerProps = {
  items: string[];
  /** Glyph shown between items. */
  separator: string;
};

export function Ticker({ items, separator }: TickerProps) {
  const row = items.flatMap((t) => [t, separator]);
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
