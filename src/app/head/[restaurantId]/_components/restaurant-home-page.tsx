import PromotionCard from "@/app/head/[restaurantId]/_components/promotion-card";
import ReviewCard from "@/app/head/[restaurantId]/_components/reivew-card";
import { DishReviews } from "@/types/dishrivews.type";
import { Promotion } from "@/types/promotion.type";

const RestaurantHomePage = ({
  promotions,
  reviews,
}: {
  promotions: Promotion[];
  reviews: DishReviews;
}) => {
  return (
    <div className="container mx-auto py-8 md:mt-20">
      <h1 className="mb-8 text-3xl font-bold">Welcome to Our Restaurant</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {promotions.map((promotion, i) => (
          <PromotionCard key={i} promotion={promotion} />
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reviews.myReview && <ReviewCard review={reviews.myReview} />}
          {reviews.otherReviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantHomePage;
