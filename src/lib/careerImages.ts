import { assetUrl } from "./assetUrl";

/** Wide careers hero (1920×633); pair with aspectRatio on HeroBanner */
export const CAREERS_HERO_BANNER = assetUrl("/careers/careers-hero-banner.png");
export const CAREERS_HERO_BANNER_ASPECT = 1920 / 633;

export const CAREERS_ABOUT_IMAGES = {
  mission: {
    src: assetUrl("/careers/careers-compass.png"),
    alt: "Compass representing vision and leadership at Tamay Enterprises",
  },
  whyWork: {
    src: assetUrl("/careers/careers-field-team.png"),
    alt: "Construction professionals collaborating on site",
  },
  whoThrives: {
    src: assetUrl("/careers/careers-office-team.png"),
    alt: "Team members celebrating a successful project",
  },
} as const;
