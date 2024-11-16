export type SocialLink = {
  id: string;
  restaurantId: string;
  platformType: "Facebook" | "Twitter" | "Tiktok";
  url: string;
};
export type ScoreOverview = {
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
};

export type Restaurant = {
  id: string;
  name: string;
  openTime: number;
  closeTime: number;
  status: "Open" | "Closed" | "PermanentlyClosed";
  socialLinks: SocialLink[];
  phone: string;
  images: string[];
  formattedAddress: string;
  latitude: number;
  longitude: number;
  headId: string;
  createdAt: string;
  scoreOverview: ScoreOverview;
};
