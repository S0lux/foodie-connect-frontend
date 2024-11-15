export interface PromotionDetail {
  dishId: string;
  promotionalPrice: number;
}

export interface Promotion {
  name: string;
  description: string;
  targets: string[];
  promotionDetails: PromotionDetail[];
  beginsAt: string;
  endsAt: string;
}
