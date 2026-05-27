import { assetUrl } from "./assetUrl";

export const CAREERS_SECTION_IMAGES = [
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
