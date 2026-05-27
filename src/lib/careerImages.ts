import { assetUrl } from "./assetUrl";

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
