import type { Project } from "@/components/work-grid";
import type { ThemeToggleProps } from "@/components/theme-toggle";
import type { VoltProps } from "@/components/volt";
import type { WorkGridLabels } from "@/components/work-grid";
import type { RichTextSegment } from "@/components/rich-text";

export const site = {
  name: "Juno Park",
  handle: "juno.exe",
  role: "Visual & interaction designer",
  location: "Brooklyn, NY",
  email: "hello@junopark.design",
  availability: "Booking projects for spring 2027",
};

export const projects: Project[] = [
  {
    slug: "chrome-heart",
    title: "Chrome Heart",
    file: "chrome_heart.png",
    image: "/work/chrome-heart.svg",
    alt: "A liquid-chrome heart floating over a pastel pink-to-cyan gradient with sparkles",
    category: "Branding",
    year: 2026,
    blurb: "Identity system for a jewelry label: a liquid-metal mark, holographic foil stationery, and a shiny type pairing.",
    size: "hero",
  },
  {
    slug: "dial-up-dreams",
    title: "Dial-Up Dreams",
    file: "dialup_dreams.gif",
    image: "/work/dial-up-dreams.svg",
    alt: "A beige CRT monitor showing a synthwave sunset, with a 'connecting' progress bar below",
    category: "Digital",
    year: 2026,
    blurb: "Microsite for a retro-tech podcast, with a fake loading sequence and scanline transitions.",
  },
  {
    slug: "butterfly-clip",
    title: "Butterfly Clip",
    file: "butterfly_clip.jpg",
    image: "/work/butterfly-clip.svg",
    alt: "An iridescent pink, violet, and cyan butterfly on a lime checkerboard",
    category: "Illustration",
    year: 2025,
    blurb: "A series of iridescent illustrations for a hair-accessory brand's spring drop.",
  },
  {
    slug: "orb-fm",
    title: "Orb.FM",
    file: "orb_fm.app",
    image: "/work/orb-fm.svg",
    alt: "A glossy aqua orb with white equalizer bars, labeled ORB.FM",
    category: "Digital",
    year: 2025,
    blurb: "Glassy, tactile UI for a lo-fi radio app. Every control feels like a candy-coated button.",
    size: "wide",
  },
  {
    slug: "starburst",
    title: "New! Improved!",
    file: "starburst.psd",
    image: "/work/starburst.svg",
    alt: "A yellow starburst sticker reading 'NEW! Improved formula' on a hot pink sunburst",
    category: "Packaging",
    year: 2025,
    blurb: "Packaging for a snack brand that leans into peak 2000s supermarket maximalism.",
  },
  {
    slug: "flip-phone",
    title: "Flip Phone",
    file: "flip_phone.bmp",
    image: "/work/flip-phone.svg",
    alt: "A pink flip phone, open, with a green LCD screen showing 12:00 and one new message",
    category: "Illustration",
    year: 2024,
    blurb: "Editorial illustration for an essay about texting culture before smartphones.",
  },
  {
    slug: "cyber-horizon",
    title: "Cyber Horizon",
    file: "cyber_horizon.mov",
    image: "/work/cyber-horizon.svg",
    alt: "A striped synthwave sun setting behind wireframe mountains over a neon cyan grid",
    category: "Digital",
    year: 2024,
    blurb: "Looping motion visuals for an electronic artist's world tour.",
  },
  {
    slug: "lava-type",
    title: "Groovy Specimen",
    file: "groovy_vol2.pdf",
    image: "/work/lava-type.svg",
    alt: "A type specimen poster with the word 'groovy' in italic serif among lava-lamp blobs",
    category: "Branding",
    year: 2024,
    blurb: "Type specimen poster for an independent foundry's display serif.",
  },
];


const firstName = site.name.split(" ")[0];

export const header = {
  brand: site.handle,
  brandHref: "#top",
  navLabel: "Main",
  statusLabel: "online",
  links: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Contact", href: "#contact" },
};

export const themeToggle: ThemeToggleProps = {
  label: "Dark mode",
  switchToLightTitle: "Switch to light mode",
  switchToDarkTitle: "Switch to dark mode",
  lightIcon: "☀",
  darkIcon: "☾",
};

export const hero = {
  eyebrow: `${site.role} · ${site.location}`,
  headline: [
    "Designing ",
    { text: "shiny", tone: "chrome" },
    "\nthings for the ",
    { text: "new", tone: "iridescent" },
    "\nold internet.",
  ] satisfies RichTextSegment[],
  badge: "NEW!",
  card: {
    title: "about_me.txt",
    controls: ["_", "×"],
    body: `Hi! I'm ${firstName}. I make brands, websites, and illustrations that bring the optimism of early-2000s web into the present: chrome, gloss, and a little chaos, all on a solid modern grid.`,
    primaryCta: { label: "View work", href: "#work", icon: "↓" },
    secondaryCta: { label: "Say hi", href: `mailto:${site.email}` },
  },
};

export const ticker = {
  items: [
    "Now booking spring 2027",
    "Best viewed in any browser",
    "Branding · Digital · Illustration",
    "You've got mail",
    "Sign my guestbook",
    "Est. 1999 (spiritually)",
  ],
  separator: "★",
};

export const work = {
  id: "work",
  title: ["Selected ", { text: "work", tone: "accent" }] satisfies RichTextSegment[],
  aside: "C:\\portfolio\\2024–2026",
  cardControls: ["_", "□", "×"],
  openIcon: "↗",
  labels: {
    all: "All",
    filterGroup: "Filter projects by category",
    close: "Close",
    prev: "← Prev",
    next: "Next →",
  } satisfies WorkGridLabels,
};

export const about = {
  id: "about",
  heading: [
    "Nostalgia, ",
    { text: "but make it", tone: "italic" },
    " ",
    { text: "useful", tone: "chrome" },
    ".",
  ] satisfies RichTextSegment[],
  body: "Ten years across studios and in-house teams. I borrow the fun of the Y2K web, like candy buttons, sparkle cursors, and holographic everything, and pair it with accessible, fast, well-built design. The vibe is 1999 and the craft is current.",
  counter: { label: "Visitors", count: 4213, digits: 6 },
  services: {
    title: "services.exe",
    items: [
      "Brand identity",
      "Web & product UI",
      "Illustration",
      "Packaging",
      "Motion",
      "Art direction",
    ],
  },
};

export const contact = {
  id: "contact",
  availability: site.availability,
  availabilityMarker: "▶",
  heading: [
    "Let's make something ",
    { text: "sparkly", tone: "iridescent" },
    ".",
  ] satisfies RichTextSegment[],
  email: site.email,
  emailIcon: "✉",
};

export const footer = {
  owner: site.name,
  tagline: "made with <3 and a 56k modem",
};

export const volt: Omit<VoltProps, "avatar"> = {
  name: "Volt",
  windowTitle: "volt_assistant.exe",
  greeting: {
    text: "Hi! I'm Volt ⚡ It looks like you're browsing a portfolio. Would you like some help?",
    actions: [
      { label: "Show me the work", kind: "scroll", target: work.id },
      { label: "Fun fact", kind: "fact" },
    ],
  },
  facts: [
    "Fun fact: the first website went live in 1991. It had zero chrome gradients. Tragic.",
    "Fun fact: a 56k modem would download this whole page in about 9 seconds. Worth it.",
    "Fun fact: every image here is a hand-built SVG, so it stays sharp at any zoom.",
    "Fun fact: I run on 100% recycled pixels. ♻",
    "Fun fact: the hit counter is fake, but the enthusiasm is real.",
  ],
  nextFactLabel: "Another!",
  hideLabel: "Hide Volt",
  tips: {
    [work.id]: {
      text: "It looks like you're browsing projects! Click any window to open the full case study.",
    },
    [about.id]: {
      text: `${firstName} has 10 years of making the internet shinier. Want to get in touch?`,
      action: { label: "Take me there", kind: "scroll", target: contact.id },
    },
    [contact.id]: {
      text: "It looks like you're about to send an email. Would you like help with that? 💌",
      action: { label: "Write an email", kind: "mailto", email: site.email },
    },
  },
  labels: {
    region: "Volt, site assistant",
    bringBack: "Bring back Volt, the assistant",
    closeMessage: "Close message",
    askForFact: "Ask Volt for a fun fact",
    closeBubble: "Close Volt's message",
  },
};
