import {
  ASSEMBLY_BUILT_FOR_SCALE_IMAGE,
  ASSEMBLY_PROFESSIONAL_STANDARDS_IMAGE,
  ASSEMBLY_SERVICE_IMAGES,
} from "./assemblyImages";

export const ASSEMBLY_INTRO = {
  tagline: "Scalable. Reliable. Platform-Ready Assembly Solutions.",
  heading: "Professional assembly & installation support for scalable projects",
  paragraphs: [
    "At Tamay Enterprises, we provide professional furniture assembly and installation services designed to support residential, commercial, and platform-based projects. Our services are structured for reliability, consistency, and multi-job execution—meeting the expectations of logistics partners, service platforms, and managed properties.",
    "We operate as a registered, insured company, not as individual installers, allowing us to support higher volumes, multiple locations, and coordinated scheduling with confidence and professionalism.",
  ],
} as const;

export const ASSEMBLY_WHO_WE_SUPPORT = {
  eyebrow: "WHO WE SUPPORT",
  title: "Our Assembly & Installation Services Are Designed For",
  intro:
    "Our professional assembly and installation services are built to support partners and clients who require dependable execution, clear communication, and the ability to manage multiple projects simultaneously.",
  audiences: [
    "Furniture retailers and logistics partners",
    "Marketplace-driven service platforms",
    "Property managers and multi-unit residential properties",
    "Short-term rentals and furnished apartments",
    "Real estate staging, turnovers, and model units",
  ],
  closing:
    "This flexible structure allows us to adapt to different project environments while maintaining consistent service standards.",
} as const;

export const ASSEMBLY_SERVICE_GROUPS = [
  {
    title: "Furniture Assembly Services",
    image: ASSEMBLY_SERVICE_IMAGES.furnitureAssembly,
    imageAlt: "Technician assembling white furniture with an Allen key on protective cardboard",
    items: [
      "Bed frames (platform, storage, and adjustable-ready)",
      "Headboards and footboards",
      "Sofas, sectionals, and loveseats",
      "Recliners and accent chairs",
      "Dining tables and dining chair sets",
      "Coffee tables, end tables, and console tables",
      "Dressers, nightstands, wardrobes, and storage furniture",
      "TV stands and media consoles",
    ],
  },
  {
    title: "Storage & Organization Assembly",
    image: ASSEMBLY_SERVICE_IMAGES.storageWarehouse,
    imageAlt: "Team organizing inventory and storage supplies in a warehouse",
    items: [
      "Freestanding shelving units",
      "Bookcases and display furniture",
      "Entryway storage and shoe cabinets",
      "Closet storage systems (basic to modular)",
      "Light-duty garage storage cabinets",
    ],
  },
  {
    title: "Office & Commercial Furniture Assembly",
    image: ASSEMBLY_SERVICE_IMAGES.officeAssembly,
    imageAlt: "Two technicians assembling office furniture in a bright workspace",
    items: [
      "Home office and commercial desks",
      "Office chairs and seating systems",
      "Filing cabinets and storage units",
      "Conference tables",
      "Modular office furniture",
      "Reception and waiting-area furniture",
    ],
  },
  {
    title: "Wall-Mounted & Anchored Installations",
    image: ASSEMBLY_SERVICE_IMAGES.wallMountInstall,
    imageAlt: "Installer marking drill points for a wall-mounted bracket",
    items: [
      "Wall-mounted TV stands and media units",
      "Floating shelves and wall shelving",
      "Decorative wall units and mirrors",
      "Furniture anchoring for safety and stability",
    ],
  },
  {
    title: "Multi-Unit & Property-Based Assembly Projects",
    image: ASSEMBLY_SERVICE_IMAGES.flatPackAssembly,
    imageAlt: "Technicians assembling flat-pack furniture in a furnished apartment",
    items: [
      "Apartment and condo furniture assembly",
      "Multi-unit residential installations",
      "Furnished apartments and short-term rental setups",
      "Student housing furniture installation",
      "Model units and real estate staging projects",
    ],
  },
  {
    title: "Post-Delivery & Follow-Up Assembly Services",
    image: ASSEMBLY_SERVICE_IMAGES.precisionAssembly,
    imageAlt: "Close-up of precise hardware tightening during furniture assembly",
    items: [
      "Post-delivery inspection and quality checks",
      "Hardware re-tightening",
      "Leveling and alignment adjustments",
      "Minor corrections after assembly",
      "Reassembly after room repositioning",
    ],
  },
  {
    title: "White-Glove, Client-Ready Execution",
    image: ASSEMBLY_SERVICE_IMAGES.whiteGloveVanity,
    imageAlt: "Tamay Enterprises technician assembling a vanity with LED mirror in a client home",
    items: [
      "In-home professional furniture assembly",
      "Clean, respectful work in occupied spaces",
      "Packaging and debris cleanup (when required)",
      "Final walkthrough and completion confirmation",
    ],
  },
] as const;

/** Featured photo for built-in and cabinet work (8th image in the services section) */
export const ASSEMBLY_CABINET_FEATURE = {
  image: ASSEMBLY_SERVICE_IMAGES.cabinetInstall,
  imageAlt: "Technician leveling white kitchen cabinets during installation",
  caption: "Kitchen, vanity, and built-in cabinet assembly with professional leveling and alignment.",
} as const;

export const ASSEMBLY_SCALE = {
  eyebrow: "BUILT FOR SCALE",
  title: "Built for High-Volume and Multi-Job Platforms",
  image: ASSEMBLY_BUILT_FOR_SCALE_IMAGE,
  imageAlt:
    "Tamay Enterprises assembly team of six technicians in a professional workshop, ready for high-volume projects",
  intro:
    "Unlike individual service providers, Tamay Enterprises operates as a structured company with team-based execution and standardized workflows.",
  subheading: "Our assembly and installation services are designed to support partners that require:",
  requirements: [
    "Multiple technicians available based on demand",
    "Parallel job execution across locations",
    "Structured scheduling and dispatch coordination",
    "Consistent quality standards",
    "Clear communication and documentation",
  ],
  closing:
    "This approach allows us to deliver reliable results even in high-volume environments.",
} as const;

export const ASSEMBLY_STANDARDS = {
  eyebrow: "PROFESSIONAL STANDARDS & COMPLIANCE",
  title: "Professional Standards, Safety, and Accountability",
  image: ASSEMBLY_PROFESSIONAL_STANDARDS_IMAGE,
  imageAlt:
    "Business ethics and compliance icons representing professional standards, accountability, and trust",
  intro:
    "We understand the importance of trust, brand protection, and professionalism when working inside client homes and managed properties.",
  items: [
    "Registered and insured company",
    "Experienced assembly technicians",
    "Professional appearance and conduct",
    "Respect for client property and furnishings",
    "Experience working in occupied homes and managed environments",
    "Photo documentation available when required",
  ],
} as const;

export const ASSEMBLY_WHY_PARTNERS = {
  eyebrow: "WHY PARTNERS CHOOSE US",
  title: "Why Partners Choose Tamay Enterprises",
  lead: "Reliable execution within scheduled service windows",
  items: [
    "Ability to scale for increased volume and demand",
    "One structured partner instead of multiple individuals",
    "Clear accountability and professional communication",
    "Long-term partnership mindset",
  ],
} as const;

export const ASSEMBLY_IMPORTANT_NOTE =
  "Our services align with the most common assembly and installation requests from major retailers, logistics partners, and service platforms.";
