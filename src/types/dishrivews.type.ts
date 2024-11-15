export interface Author {
  id: string;
  userName: string;
  displayName: string;
  avatar: string;
}

export interface Review {
  reviewId: string;
  dishId: string;
  author: Author;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DishReviews {
  myReview: Review;
  otherReviews: Review[];
}
