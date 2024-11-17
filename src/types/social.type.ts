export interface SocialLink {
  id: string;
  platformType: "Facebook" | "Twitter" | "Tiktok";
  url: string;
}

export interface SocialLinks {
  socials: SocialLink[];
}
