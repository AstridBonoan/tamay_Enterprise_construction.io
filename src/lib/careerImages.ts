import { assetUrl } from "./assetUrl";

/** Intro carousel (after hero) — matches live site placement */
export const CAREERS_INTRO_SLIDES = [
  {
    src: assetUrl("/careers/careers-compass.png"),
    alt: "Compass symbolizing career direction and growth at Tamay Enterprises",
  },
  {
    src: assetUrl("/careers/careers-field-team.png"),
    alt: "Diverse construction team collaborating on a job site",
  },
  {
    src: assetUrl("/careers/careers-office-team.png"),
    alt: "Tamay Enterprises team celebrating success together",
  },
] as const;

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
