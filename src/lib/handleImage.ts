import cld from "@/lib/cld";

export function handleImage(
  images: string[],
  type: "logo" | "banner" | "",
  fallbackSeed: string,
) {
  const imageMeta = images.find((image) => image.includes(type));

  if (imageMeta) {
    const [imagePath, imageVersion] = imageMeta.split(".");
    return cld.image(imagePath).setVersion(imageVersion).toURL();
  }

  switch (type) {
    case "logo":
      return `https://api.dicebear.com/9.x/initials/svg?seed=${fallbackSeed}`;
    case "banner":
      return `https://api.dicebear.com/9.x/icons/svg?seed=${fallbackSeed}`;
    default:
      return `https://api.dicebear.com/9.x/icons/svg?seed=${fallbackSeed}`;
  }
}

export function getLogoUrl(images: string[], restaurantName: string) {
  return handleImage(images, "logo", restaurantName);
}

export function getBannerUrl(images: string[], restaurantName: string) {
  return handleImage(images, "banner", restaurantName);
}

export function getDefaultImageUrl(images: string[], restaurantName: string) {
  return handleImage(images, "", restaurantName);
}
