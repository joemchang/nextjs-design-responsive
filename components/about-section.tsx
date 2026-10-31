import { HitCounter, type HitCounterProps } from "./hit-counter";
import { RichText, type RichTextSegment } from "./rich-text";
import { Sparkle } from "./sparkle";
import { TitleBar } from "./title-bar";

export type AboutSectionProps = {
  id: string;
  heading: RichTextSegment[];
  body: string;
  counter: HitCounterProps;
  services: { title: string; items: string[] };
};

export function AboutSection({ id, heading, body, counter, services }: AboutSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-y-2 border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl leading-none sm:text-7xl">
            <RichText segments={heading} />
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{body}</p>
          <div className="mt-8">
            <HitCounter {...counter} />
          </div>
        </div>

        <div className="window self-start">
          <TitleBar title={services.title} />
          <ul className="divide-y-2 divide-line/15">
            {services.items.map((s, i) => (
              <li key={s} className="flex items-center gap-4 px-5 py-4">
                <span className="font-pixel text-xl text-pink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium">{s}</span>
                <Sparkle className="ml-auto size-4 text-violet" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
