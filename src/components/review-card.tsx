import { ReactNode } from "react";
import { ReviewEnum } from "./dish-review-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { twMerge } from "tailwind-merge";
import { Star, Store, Utensils } from "lucide-react";
import { DishReview } from "@/types/dish-review.type";
import { RestaurantReview } from "@/types/restaurant-review.type";

export const ReviewCard = ({
  children,
  reviewType,
  review,
}: {
  children?: ReactNode;
  review?: DishReview | RestaurantReview;
  reviewType: ReviewEnum;
}) => {
  return (
    <Card className="relative border-none dark:bg-muted/20">
      <CardHeader className="border-b border-muted-foreground/30 py-2">
        <CardTitle className="flex flex-row items-center justify-between">
          {/* reviewer info */}
          <div className="flex flex-row md:space-x-2">
            <img
              src="https://placehold.co/50x50"
              className="absolute aspect-square size-0 rounded-full md:relative md:size-10"
            ></img>
            <div className="flex flex-col">
              <span className="text-sm">{review?.author.displayName}</span>
              <span className="text-xs text-muted-foreground">
                {review?.author.userName}
              </span>
            </div>
          </div>

          {/* review's rating */}
          <div className="flex flex-row">
            {review &&
              Array.from({ length: review.rating }, (_, i) => (
                <Star fill="#D4AF37" stroke="#D4AF37" size={20} />
              ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        {/* review content */}
        {review?.content}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {/* posted date */}
        Posted in: {review && new Date(review.createdAt).toLocaleDateString()}
      </CardFooter>

      <ReviewTag className="bottom-0 right-7">
        {reviewType === ReviewEnum.RESTAURANT && <Store size={20}></Store>}
        {reviewType === ReviewEnum.DISH && <Utensils size={20}></Utensils>}
      </ReviewTag>
    </Card>
  );
};

export const ReviewTag = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "absolute block rounded-t bg-primary p-1 text-white opacity-90",
        className,
      )}
    >
      {/* pass lucide icons hear */}
      {children}
    </div>
  );
};
