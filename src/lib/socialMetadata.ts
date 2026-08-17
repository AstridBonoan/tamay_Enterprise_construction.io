import type { Metadata } from "next";

/**
 * Approved social-preview images for the public website.
 * Files live in /public/social/ and are served as /social/*.png
 */
export const SOCIAL_IMAGE = {
  home: "/social/home-social.png",
  construction: "/social/construction-social.png",
  realEstate: "/social/real-estate-social.png",
  logistics: "/social/logistics-social.png",
  reviews: "/social/reviews-social.png",
  gallery: "/social/gallery-social.png",
  careers: "/social/careers-partnerships-social.png",
  finance: "/social/finance-social.png",
  assembly: "/social/assembly-installation-social.png",
  preventive: "/social/home-preventive-services-social.png",
  appointments: "/social/online-appointments-social.png",
} as const;

const SOCIAL_IMAGE_SIZE: Record<string, { width: number; height: number }> = {
  [SOCIAL_IMAGE.home]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.construction]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.realEstate]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.logistics]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.reviews]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.gallery]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.careers]: { width: 1536, height: 807 },
  [SOCIAL_IMAGE.finance]: { width: 1731, height: 909 },
  [SOCIAL_IMAGE.assembly]: { width: 1731, height: 909 },
  [SOCIAL_IMAGE.preventive]: { width: 1731, height: 909 },
  [SOCIAL_IMAGE.appointments]: { width: 1731, height: 909 },
};

type SocialPageConfig = {
  /** Pathname with trailing slash (matches next.config trailingSlash). */
  path: string;
  /** Document / social title. Use absoluteTitle when the title already includes branding. */
  title: string;
  description: string;
  image: string;
  /** When true, skip the root layout title template ("%s | Tamay Enterprises"). */
  absoluteTitle?: boolean;
};

type SocialOverrides = {
  path?: string;
  title?: string;
  description?: string;
  absoluteTitle?: boolean;
};

const PAGES = {
  home: {
    path: "/",
    title: "Construction Company in West Haven, CT | Tamay Enterprises",
    description:
      "Tamay Enterprises is a West Haven, CT–based multi-service company providing construction, real estate, and logistics services.",
    image: SOCIAL_IMAGE.home,
    absoluteTitle: true,
  },
  construction: {
    path: "/construction/",
    title: "Construction & Home Renovation",
    description:
      "Tamay Enterprises delivers construction and home renovation services in West Haven, CT including full renovations, additions, and kitchen & bathroom remodeling.",
    image: SOCIAL_IMAGE.construction,
  },
  realEstate: {
    path: "/real-estate/",
    title: "Real Estate Services",
    description:
      "Real estate services backed by construction expertise for buyers, sellers, and investors in West Haven, CT.",
    image: SOCIAL_IMAGE.realEstate,
  },
  logistics: {
    path: "/logistics/",
    title: "Logistics & Delivery Services",
    description:
      "Professional local and regional logistics and delivery services in West Haven, CT.",
    image: SOCIAL_IMAGE.logistics,
  },
  reviews: {
    path: "/reviews/",
    title: "Client Reviews",
    description:
      "Client reviews and testimonial videos from Tamay Enterprises in West Haven, CT.",
    image: SOCIAL_IMAGE.reviews,
  },
  gallery: {
    path: "/gallery/",
    title: "Project Gallery",
    description:
      "Project video gallery of construction and renovation work by Tamay Enterprises across Connecticut.",
    image: SOCIAL_IMAGE.gallery,
  },
  careers: {
    path: "/careers-partnerships/",
    title: "Careers & Partnerships | Tamay Enterprises",
    description:
      "Construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT. Build long-term careers in residential construction.",
    image: SOCIAL_IMAGE.careers,
    absoluteTitle: true,
  },
  finance: {
    path: "/finance/",
    title: "Financing Options | Tamay Enterprises",
    description:
      "Explore flexible financing options for qualified home improvement projects with Tamay Enterprises.",
    image: SOCIAL_IMAGE.finance,
    absoluteTitle: true,
  },
  assembly: {
    path: "/assembly-installation/",
    title: "Assembly & Installation Services | Tamay Enterprises",
    description:
      "Professional furniture assembly, fixture installation, TV mounting, shelving, and home setup services.",
    image: SOCIAL_IMAGE.assembly,
    absoluteTitle: true,
  },
  preventive: {
    path: "/home-preventive-services/",
    title: "Home Preventive Services | Tamay Enterprises",
    description:
      "Protect your property year-round with preventive maintenance, inspections, seasonal service, and small home repairs.",
    image: SOCIAL_IMAGE.preventive,
    absoluteTitle: true,
  },
  appointments: {
    path: "/online-appointments/",
    title: "Online Appointments | Tamay Enterprises",
    description:
      "Book your Tamay Enterprises consultation, estimate, or service appointment online.",
    image: SOCIAL_IMAGE.appointments,
    absoluteTitle: true,
  },
} as const satisfies Record<string, SocialPageConfig>;

export type SocialPageKey = keyof typeof PAGES;

/** Full Metadata (title, description, canonical, Open Graph, Twitter) for a public page. */
export function buildSocialMetadata(key: SocialPageKey, overrides?: SocialOverrides): Metadata {
  const base = PAGES[key];
  const socialTitle = overrides?.title ?? base.title;
  const description = overrides?.description ?? base.description;
  const path = overrides?.path ?? base.path;
  const useAbsoluteTitle =
    overrides?.absoluteTitle === true ||
    (overrides?.absoluteTitle !== false && "absoluteTitle" in base && base.absoluteTitle === true);
  const imageSize = SOCIAL_IMAGE_SIZE[base.image] ?? { width: 1200, height: 630 };

  return {
    title: useAbsoluteTitle ? { absolute: socialTitle } : socialTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: base.image,
          width: imageSize.width,
          height: imageSize.height,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [base.image],
    },
  };
}

/** Snapshot used for verification / reporting. */
export function getSocialPageReport() {
  return Object.entries(PAGES).map(([key, page]) => ({
    key,
    path: page.path,
    title: page.title,
    description: page.description,
    image: page.image,
  }));
}
