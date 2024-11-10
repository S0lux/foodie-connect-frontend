export type SocialLink = {
  id: string;
  restaurantId: string;
  platformType: string;
  url: string;
};

export type Restaurant = {
  id: string;
  name: string;
  openTime: number;
  closeTime: number;
  status: "Open" | "Closed";
  socialLinks: SocialLink[];
  phone: string;
  images: string[];
  formattedAddress: string;
  latitude: number;
  longitude: number;
  headId: string;
  createdAt: string;
};
