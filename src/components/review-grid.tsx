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
import { StarFilledIcon } from "@radix-ui/react-icons";

export const ReviewGrid = ({ reviews }: { reviews: ReviewDto[] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const alterReview = menuOpen ? reviews : reviews.slice(0, 3);

  const avgRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  return (
    <Card className="space-y-3 border-none px-3 py-2">
      <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 py-3 text-xl">
        <span>Reviews</span>
      </CardTitle>
      <CardContent className="flex flex-row">
        {/* reviews */}
        <div className="relative flex flex-col space-y-5 md:w-1/2">
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
        <ReviewStatistics></ReviewStatistics>
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

const ReviewStatistics = () => {
  return (
    <div className="sticky top-28 mt-5 w-1/2">
      <div className="sticky top-20 mt-5 grid grid-cols-3">
        {/* overal rating */}
        <div className="flex flex-col place-self-center">
          <span className="text-center text-5xl font-bold text-primary">
            4.3
          </span>
          <div className="flex flex-row justify-center text-primary">
            <StarFilledIcon></StarFilledIcon>
            <StarFilledIcon></StarFilledIcon>
            <StarFilledIcon></StarFilledIcon>
            <StarFilledIcon></StarFilledIcon>
            <StarFilledIcon></StarFilledIcon>
          </div>
          <span className="mt-3 text-center text-sm text-foreground">
            10 reviews
          </span>
        </div>

        {/* rating statistics */}
        <div className="col-span-2 flex flex-col">
          <RatingStats label="5" percentage={"60"}></RatingStats>
          <RatingStats label="4" percentage={"20"}></RatingStats>
          <RatingStats label="3" percentage={"10"}></RatingStats>
          <RatingStats label="2" percentage={"5"}></RatingStats>
          <RatingStats label="1" percentage={"5"}></RatingStats>
        </div>
      </div>
    </div>
  );
};

const RatingStats = ({
  label,
  percentage,
}: {
  label: string;
  percentage: string;
}) => {
  return (
    <div className="relative flex w-full flex-row items-center space-x-3">
      <span>{label}</span>
      <div className="relative h-2 w-full rounded bg-background">
        <div
          className="absolute left-0 top-0 h-2 rounded bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
