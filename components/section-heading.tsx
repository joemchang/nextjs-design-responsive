import { RichText, type RichTextSegment } from "./rich-text";

export type SectionHeadingProps = {
  title: RichTextSegment[];
  /** Small pixel-font note aligned to the right of the title. */
  aside?: string;
};

export function SectionHeading({ title, aside }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 className="font-display text-6xl leading-none sm:text-7xl">
        <RichText segments={title} />
      </h2>
      {aside && <p className="font-pixel text-xl text-muted">{aside}</p>}
    </div>
  );
}
