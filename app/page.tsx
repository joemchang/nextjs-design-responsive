import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticker } from "@/components/ticker";
import { Volt } from "@/components/volt";
import { VoltRobot } from "@/components/volt-robot";
import { WorkGrid } from "@/components/work-grid";
import { about, contact, footer, header, hero, projects, themeToggle, ticker, volt, work } from "./content";

export default function Home() {
  return (
    <>
      <SiteHeader {...header}>
        <ThemeToggle {...themeToggle} />
      </SiteHeader>

      <main id="top" className="flex-1">
        <Hero {...hero} />
        <Ticker {...ticker} />

        <section id={work.id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
          <SectionHeading title={work.title} aside={work.aside} />
          <WorkGrid
            projects={projects}
            labels={work.labels}
            cardControls={work.cardControls}
            openIcon={work.openIcon}
          />
        </section>

        <AboutSection {...about} />
        <ContactSection {...contact} />
      </main>

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} ${footer.owner}`}
        tagline={footer.tagline}
      />

      <Volt {...volt} avatar={<VoltRobot />} />
    </>
  );
}
