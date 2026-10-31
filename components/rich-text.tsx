import { Fragment } from "react";

export type Tone = "chrome" | "iridescent" | "accent" | "italic";

export type RichTextSegment = string | { text: string; tone: Tone };

const toneClasses: Record<Tone, string> = {
  chrome: "chrome-text italic",
  iridescent: "iridescent-text italic",
  accent: "italic text-pink",
  italic: "italic",
};

/** Plain text with optional styled spans. A "\n" inside a string renders a line break. */
export function RichText({ segments }: { segments: RichTextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        const text = typeof seg === "string" ? seg : seg.text;
        const lines = text.split("\n").map((line, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {line}
          </Fragment>
        ));
        return typeof seg === "string" ? (
          <Fragment key={i}>{lines}</Fragment>
        ) : (
          <span key={i} className={toneClasses[seg.tone]}>
            {lines}
          </span>
        );
      })}
    </>
  );
}
