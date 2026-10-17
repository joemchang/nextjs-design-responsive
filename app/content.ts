export const site = {
  name: "Juno Park",
  handle: "juno.exe",
  role: "Visual & interaction designer",
  location: "Brooklyn, NY",
  email: "hello@junopark.design",
  availability: "Booking projects for spring 2027",
};

export type Category = "Branding" | "Digital" | "Illustration" | "Packaging";

export type Project = {
  slug: string;
  title: string;
  file: string;
  image: string;
  alt: string;
  category: Category;
  year: number;
  blurb: string;
  // Bento footprint on large screens. "hero" = 2×2, "wide" = 2×1.
  size?: "hero" | "wide";
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

export const services = [
  "Brand identity",
  "Web & product UI",
  "Illustration",
  "Packaging",
  "Motion",
  "Art direction",
];
