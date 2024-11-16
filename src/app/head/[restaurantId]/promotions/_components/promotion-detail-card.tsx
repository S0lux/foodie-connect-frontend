import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Store, Tag, Gift, Edit, Trash2 } from "lucide-react";
import { Promotion } from "@/types/promotion.type";
import usePromotion from "@/hooks/use-promotion";
import { useParams } from "next/navigation";
import useDishes from "@/hooks/use-dishes";
import useRestaurants from "@/hooks/use-restaurants";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";

interface PromotionDetailCardProps {
  promotionId: string;
  onEdit?: (promotion: Promotion) => void;
  onDelete?: (promotionId: string) => void;
}

const PromotionDetailCard = ({
  promotionId,
  onDelete,
}: PromotionDetailCardProps) => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: dishes, isLoading: isLoadingDishes } =
    useDishes.useGetDishes(restaurantId);
  const { data: promotion, isLoading: isLoadingPromotion } =
    usePromotion.useGetPromotion(restaurantId, promotionId);
  const { data: restaurant, isLoading: isLoadingRestaurant } =
    useRestaurants.useGetRestaurant(restaurantId);
  console.log(promotion);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPromotionStatus = () => {
    const now = new Date();
    const beginDate = new Date(promotion?.beginsAt ?? "");
    const endDate = new Date(promotion?.endsAt ?? "");

    if (now < beginDate) {
      return {
        label: "Upcoming",
        className: "bg-blue-100 text-blue-800",
      };
    } else if (now > endDate) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-800",
      };
    } else {
      return {
        label: "Active",
        className: "bg-green-100 text-green-800",
      };
    }
  };

  const status = getPromotionStatus();

  if (isLoadingPromotion || isLoadingDishes || isLoadingRestaurant) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-2xl">{promotion?.name}</CardTitle>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="text-red-600 hover:text-red-700"
              onClick={() =>
                promotion?.promotionId && onDelete?.(promotion.promotionId)
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <div className="rounded-lg w-full p-4">
          <p
            style={{ overflowWrap: "anywhere" }}
            className="w-full break-words"
          >
            {promotion?.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Duration:</span>
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

        {/* Restaurant Info */}
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          <span className="font-medium">Restaurant:</span>
          <span>{restaurant?.name}</span>
        </div>

        {/* Targets */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="font-medium">Target Categories:</span>
          </div>
          <div className="ml-7 flex flex-wrap gap-2">
            {promotion?.targets.map((target, index) => (
              <Badge key={index} variant="secondary">
                {target}
              </Badge>
            ))}
          </div>
        </div>

        {/* Promotion Details */}
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
      </CardContent>
    </Card>
  );
};

export default PromotionDetailCard;
