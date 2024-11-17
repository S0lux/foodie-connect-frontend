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
    <Card className="mb-4 flex min-h-[450px] flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{promotion.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Description Section */}
        <div className="h-16">
          <p className="line-clamp-2 text-gray-600">{promotion?.description}</p>
        </div>

        {/* Target Categories Section */}
        <div className="min-h-[60px]">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="font-medium">Target Categories:</span>
          </div>
          <div className="ml-7 flex flex-wrap gap-2">
            {promotion?.targets.map((target, index) => (
              <Badge key={index} className="px-2 py-0.5">
                {target}
              </Badge>
            ))}
          </div>
        </div>

        {/* Promotional Items Section */}
        <div className="min-h-[120px] flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Gift className="h-5 w-5" />
            <span className="font-medium">Promotional Items:</span>
          </div>
          <div className="rounded-lg ml-7 divide-y bg-gray-50">
            {promotion?.promotionDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2"
              >
                <span className="text-gray-700">
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

        {/* Duration Section */}
        <div className="h-24">
          <div className="mb-2 flex items-center gap-2">
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
