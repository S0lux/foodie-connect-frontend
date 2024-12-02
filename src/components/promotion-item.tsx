import { Promotion as FullPromotion } from "@/types/promotion.type";
import { Promotion as DishPromotion } from "@/types/dishes.type";
import { CardContent, CardDescription, CardTitle } from "./ui/card";
import { Tags } from "lucide-react";
import { twMerge } from "tailwind-merge";

const PromotionItem = ({
  shortenContent,
  promotion,
}: {
  shortenContent?: boolean;
  promotion: DishPromotion | FullPromotion;
}) => {
  const today = new Date();
  const daysLeft = Math.ceil(
    (new Date(promotion.endsAt).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <div className={twMerge("flex w-full flex-row items-start space-x-2")}>
      <Tags className="size-fit text-accent"></Tags>
      <CardContent
        className={twMerge("flex w-full flex-col justify-between p-0")}
      >
        <div className="">
          <CardTitle className="items-center-semibold flex">
            <span className="line-clamp-1">{promotion.name}</span>
          </CardTitle>
          <CardDescription className="line-clamp-1 break-words">
            {promotion.description}
          </CardDescription>
        </div>

        {daysLeft > 0 && new Date(promotion.endsAt) > today ? (
          <CardDescription className="text-primary">
            <span>{daysLeft} days left</span>
          </CardDescription>
        ) : (
          <CardDescription className="text-red-500">
            <span>Expired</span>
          </CardDescription>
        )}
      </CardContent>
    </div>
  );
};

export default PromotionItem;
