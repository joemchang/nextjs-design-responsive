export type TitleBarProps = {
  title: string;
  /** Decorative window-control glyphs, left to right. */
  controls?: string[];
  className?: string;
};

export function TitleBar({ title, controls = [], className = "" }: TitleBarProps) {
  return (
    <div className={`titlebar ${className}`}>
      <span className="font-pixel text-lg leading-none truncate">{title}</span>
      {controls.length > 0 && (
        <span className="ml-auto flex gap-1" aria-hidden>
          {controls.map((c, i) => (
            <span key={i} className="titlebar-btn">
              {c}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}
