export type SiteFooterProps = {
  copyright: string;
  tagline?: string;
};

export function SiteFooter({ copyright, tagline }: SiteFooterProps) {
  return (
    <footer>
      <div className="construction h-3" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
        <p>{copyright}</p>
        {tagline && <p className="font-pixel text-lg">{tagline}</p>}
      </div>
    </footer>
  );
}
