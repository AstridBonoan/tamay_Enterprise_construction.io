import { assetUrl } from "./assetUrl";

export const ASSEMBLY_HERO_BANNER = assetUrl("/assembly-installation/hero-banner-v2.png");
/** Match hero asset (1024×460) for full-width banner without cropping sides */
export const ASSEMBLY_HERO_BANNER_ASPECT = 1024 / 460;

export const ASSEMBLY_BUILT_FOR_SCALE_IMAGE = assetUrl("/assembly-installation/built-for-scale.png");

export const ASSEMBLY_PROFESSIONAL_STANDARDS_IMAGE = assetUrl(
  "/assembly-installation/professional-standards.png",
);

const service = (file: string) => assetUrl(`/assembly-installation/services/${file}`);

export const ASSEMBLY_SERVICE_IMAGES = {
  furnitureAssembly: service("furniture-assembly.png"),
  whiteGloveVanity: service("white-glove-vanity.png"),
  storageWarehouse: service("storage-warehouse.png"),
  officeAssembly: service("office-assembly.png"),
  wallMountInstall: service("wall-mount-install.png"),
  flatPackAssembly: service("flat-pack-assembly.png"),
  cabinetInstall: service("cabinet-install.png"),
  precisionAssembly: service("precision-assembly.png"),
} as const;
