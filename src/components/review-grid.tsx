"use client";
import { ReviewDto } from "@/app/(main)/restaurant-detail/[id]/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDown, ArrowDownFromLine, ArrowUp } from "lucide-react";

export const ReviewGrid = ({ reviews }: { reviews: ReviewDto[] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const alterReview = menuOpen ? reviews : reviews.slice(0, 3);

  const avgRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  return (
    <Card className="space-y-3 border-none px-3 py-2">
      <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 bg-accent-foreground py-3 text-xl">
        <span>Reviews</span>
        <div className="flex h-fit justify-center">
          <div
            className={twMerge(
              "flex size-10 flex-col items-center justify-center space-y-2 rounded-full font-semibold text-white shadow md:size-12",
              avgRating >= 7 && "bg-green-500",
              avgRating < 7 && avgRating >= 4 && "bg-yellow-500",
              avgRating < 4 && "bg-red-500",
            )}
          >
            <span className="text-base">{avgRating}</span>
          </div>
        </div>
      </CardTitle>
      <CardContent>
        {/* reviews */}
        <div className="space-y-5 md:w-1/2">
          {alterReview.map((review: ReviewDto, index: number) => {
            return (
              <RatingCard
                key={index}
                rating={review.rating}
                postedDate={review.postedDate}
              >
                {review.content}
              </RatingCard>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div
          className="flex w-full cursor-pointer flex-row justify-center space-x-1 rounded py-2 text-primary md:hover:bg-muted/10"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span>{menuOpen ? "Less" : "More"} comments</span>
          {menuOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </CardFooter>
    </Card>
  );
};

const RatingCard = ({
  children,
  rating,
  postedDate,
}: {
  children?: ReactNode;
  rating: number;
  postedDate: Date;
}) => {
  return (
    <Card className="border-none dark:bg-muted/20">
      <CardHeader className="">
        <CardTitle>
          <div
            className={twMerge(
              "flex size-10 items-center justify-center rounded-full text-white",
              rating >= 7 && "bg-green-500",
              rating < 7 && rating >= 4 && "bg-yellow-500",
              rating < 4 && "bg-red-500",
            )}
          >
            <span>{rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="md:text-lg">{children}</CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Posted in: {postedDate.toLocaleDateString()}
      </CardFooter>
    </Card>
  );
};
