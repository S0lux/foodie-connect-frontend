export type Dish = {
  dishId: string;
  restaurantId: string;
  name: string;
  description: string;
  imageId: string;
  price: number;
  categories: string[];
  scoreOverview: {
    averageRating: number;
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
  };
};
