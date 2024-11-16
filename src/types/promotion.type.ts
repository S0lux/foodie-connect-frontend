export interface PromotionDetail {
  dishId: string;
  promotionalPrice: number;
}

export interface Promotion {
  promotionId: string;
  restaurantId: string;
  name: string;
  bannerId: string;
  description: string;
  targets: string[];
  promotionDetails: PromotionDetail[];
  beginsAt: string;
  endsAt: string;
}

export type Promotions = Promotion[];
