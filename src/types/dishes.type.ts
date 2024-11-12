export interface Category {
  restaurantId: string;
  categoryName: string;
}

export interface ScoreOverview {
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  bannerId: string;
  targets: string[];
  promotionalPrice: number;
}

export interface Dish {
  dishId: string;
  restaurantId: string;
  name: string;
  description: string;
  imageId: string | null;
  price: number;
  categories: string[];
  scoreOverview: ScoreOverview;
  promotions: Promotion[];
}
