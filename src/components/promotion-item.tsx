import { Promotion } from "@/types/promotion.type";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Tags } from "lucide-react";
import { Badge } from "./ui/badge";
import { truncate } from "./restaurant-card";
import Image from "next/image";
import { getDefaultImageUrl } from "@/lib/handleImage";

const PromotionItem = ({ promotion }: { promotion: Promotion }) => {
  const daysLeft =
    new Date(promotion.endsAt).getDate() -
    new Date(promotion.beginsAt).getDate();
  return (
    <div className="flex w-full flex-row items-center space-x-2 rounded">
      {/* <Image
        src={
          getDefaultImageUrl(
            promotion.bannerId ? [promotion.promotionId] : [],
            promotion.name,
          ) || "https://placehold.co/50X50"
        }
        alt={promotion.name}
        width={50}
        height={50}
        className="rounded"
      /> */}
      <div className="flex w-full flex-col items-start justify-center">
        <CardTitle className="flex flex-row items-center space-x-1 font-semibold">
          <Tags className="text-accent"></Tags>
          <span>{truncate(promotion.name, 10)}</span>
        </CardTitle>
        <CardDescription className="break-words">
          {truncate(promotion.description, 20)}
        </CardDescription>

        {daysLeft > 0 ? (
          <CardDescription className="text-primary">
            {daysLeft} days left
          </CardDescription>
        ) : (
          <CardDescription>Expired</CardDescription>
        )}
      </div>
    </div>
  );
};

export default PromotionItem;
