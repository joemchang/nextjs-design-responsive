import { RichText, type RichTextSegment } from "./rich-text";

export type ContactSectionProps = {
  id: string;
  availability: string;
  /** Glyph that blinks before the availability line. */
  availabilityMarker?: string;
  heading: RichTextSegment[];
  email: string;
  emailIcon?: string;
};

export function ContactSection({
  id,
  availability,
  availabilityMarker,
  heading,
  email,
  emailIcon,
}: ContactSectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 text-center sm:px-6">
      <p className="font-pixel text-2xl text-pink uppercase">
        {availabilityMarker && (
          <span className="blink" aria-hidden>{availabilityMarker} </span>
        )}
        {availability}
      </p>
      <h2 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9]">
        <RichText segments={heading} />
      </h2>
      <a
        href={`mailto:${email}`}
        className="btn-chrome mt-10 px-7 py-4 text-lg font-semibold break-all"
      >
        {emailIcon && <><span aria-hidden>{emailIcon}</span> </>}
        {email}
      </a>
    </section>
  );
}
