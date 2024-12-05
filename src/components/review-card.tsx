import { ReactNode } from "react";
import { ReviewEnum } from "./dish-review-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { twMerge } from "tailwind-merge";
import {
  Edit,
  EditIcon,
  EllipsisVertical,
  Menu,
  Star,
  Store,
  Trash,
  Utensils,
} from "lucide-react";
import { DishReview } from "@/types/dish-review.type";
import { RestaurantReview } from "@/types/restaurant-review.type";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import useAuth from "@/hooks/use-auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { description } from "../app/head/[restaurantId]/reports/_components/pie-chart";
import useDishReview from "@/hooks/use-dish-review";
import { getAvatarUrl, getInitials } from "@/lib/handleImage";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ErrorType } from "@/types/error.type";

export const ReviewCard = ({
  id,
  refetch,
  reviewType,
  review,
  onEdit,
}: {
  id: string;
  refetch: Array<() => void>;
  children?: ReactNode;
  review?: DishReview | RestaurantReview;
  reviewType: ReviewEnum;
  onEdit?: () => void;
}) => {
  const deleteRestaurantReviewAction =
    useRestaurantDetail.useDeleteRestaurantReview();
  const deleteDishAction = useDishReview.useDeleteDishReview();

  const { data: user } = useAuth.useGetSession();
  const canEdit = review?.author.id === user?.id;

  const handleDelete = async () => {
    try {
      if (reviewType === ReviewEnum.RESTAURANT && review) {
        await deleteRestaurantReviewAction.mutateAsync({
          restaurantId: id,
          reviewId: review.reviewId,
        });
      }
      if (reviewType === ReviewEnum.DISH && review) {
        await deleteDishAction.mutateAsync({
          dishId: id,
          reviewId: review.reviewId,
        });
      }
      refetch.forEach((func) => {
        func();
      });
      toast({
        title: "Success",
        description: "Review removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="relative rounded-none border-x-0 border-t-0 border-muted/70 shadow-none">
      <CardHeader className="px-1 py-3 md:p-6">
        <CardTitle className="flex flex-row items-center justify-between">
          {/* reviewer info */}
          <div className="flex flex-row items-center space-x-2">
            <Avatar className="size-8 shadow xl:size-10">
              {review?.author && (
                <AvatarImage
                  src={getAvatarUrl(
                    review.author.avatar ?? "",
                    review.author.userName,
                  )}
                  alt={review?.author.userName}
                ></AvatarImage>
              )}
              <AvatarFallback>
                {getInitials(review?.author.userName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-sm">{review?.author.displayName}</span>
              <span className="text-xs text-muted-foreground">
                @{review?.author.userName}
              </span>
            </div>
          </div>

          {/* review's rating */}
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger className="mx-1">
                <EllipsisVertical size={20}></EllipsisVertical>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absoute right-0 py-2">
                <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                  <EditIcon></EditIcon>
                  <span>Edit review</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-500"
                  onClick={handleDelete}
                >
                  <Trash></Trash>
                  <span>Delete review</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-1 md:p-6 md:pt-0">
        {/* review content */}
        <p className="break-words">
          {review?.content ? (
            review.content
          ) : (
            <CardDescription className="italic">no comment</CardDescription>
          )}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col items-start space-y-2 px-1 text-sm text-muted-foreground md:p-6 md:pt-0">
        {/* review's rating */}
        <div className="flex flex-row items-center">
          {review &&
            Array.from({ length: review.rating }, (_, i) => (
              <Star fill="#D4AF37" stroke="#D4AF37" size={20} />
            ))}
        </div>
        {/* posted date */}
        <span>
          Posted in: {review && new Date(review.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>

      <ReviewTag className="bottom-0 right-6 rounded-t">
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
        "absolute block rounded-tl bg-primary p-1 text-white opacity-90",
        className,
      )}
    >
      {/* pass lucide icons hear */}
      {children}
    </div>
  );
};
