import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Promotion } from "@/types/promotion.type";
import {
  ArrowBigRight,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
  Clock,
  Gift,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import useDishes from "@/hooks/use-dishes";

const PromotionCard = ({ promotion }: { promotion: Promotion }) => {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const { data: dishes, isLoading: isLoadingDishes } =
    useDishes.useGetDishes(restaurantId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="">{promotion.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-0 flex flex-col gap-4">
        <div>
          <p
            style={{
              height: "50px",
              overflowWrap: "anywhere",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="w-full break-words"
          >
            {promotion?.description}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="font-medium">Target Categories:</span>
          </div>
          <div className="ml-7 flex flex-wrap gap-2">
            {promotion?.targets.map((target, index) => (
              <Badge key={index}>{target}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            <span className="font-medium">Promotional Items:</span>
          </div>
          <div className="rounded-lg ml-7 divide-y">
            {promotion?.promotionDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3"
              >
                <span>
                  Dish:{" "}
                  {dishes?.find((dish) => dish.dishId === detail.dishId)
                    ?.name || detail.dishId}
                </span>

                <span className="font-medium text-green-600">
                  ${detail.promotionalPrice.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="font-bold">Duration:</span>
          </div>
          <div className="ml-7 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span>
                Starts:{" "}
                {promotion?.beginsAt ? formatDate(promotion.beginsAt) : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              <span>
                Ends: {promotion?.endsAt ? formatDate(promotion.endsAt) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
