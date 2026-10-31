import { RichText, type RichTextSegment } from "./rich-text";
import { Sparkle } from "./sparkle";
import { TitleBar } from "./title-bar";

export type Cta = { label: string; href: string; icon?: string };

export type HeroProps = {
  eyebrow: string;
  headline: RichTextSegment[];
  badge?: string;
  card: {
    title: string;
    controls?: string[];
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
};

export function Hero({ eyebrow, headline, badge, card }: HeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-24">
      <div className="grid items-end gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="relative">
          <p className="mb-6 inline-flex items-center gap-2 sticker bg-card px-4 py-1.5 text-sm">
            <Sparkle className="size-3.5 text-violet" />
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] tracking-tight">
            <RichText segments={headline} />
          </h1>
          {badge && (
            <span className="sticker absolute -right-1 top-6 hidden rotate-12 bg-pink px-4 py-2 font-pixel text-2xl text-white sm:block lg:right-6">
              {badge}
            </span>
          )}
        </div>

        <div className="window">
          <TitleBar title={card.title} controls={card.controls} />
          <div className="space-y-5 p-5">
            <p className="leading-relaxed">{card.body}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={card.primaryCta.href} className="btn-chrome px-5 py-2.5 text-sm font-semibold">
                {card.primaryCta.label}
                {card.primaryCta.icon && <> <span aria-hidden>{card.primaryCta.icon}</span></>}
              </a>
              <a
                href={card.secondaryCta.href}
                className="text-sm font-medium underline decoration-pink decoration-2 underline-offset-4 hover:text-pink"
              >
                {card.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
