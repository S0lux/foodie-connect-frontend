import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Promotion } from "@/types/promotion.type";
import {
  ArrowBigRight,
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
} from "lucide-react";

const PromotionCard = ({ promotion }: { promotion: Promotion }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="">{promotion.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-0">
        <p>{promotion.description}</p>
        <div className="mt-4">
          <h3 className="font-bold">Targets:</h3>
          <ul>
            {promotion.targets.map((target, i) => (
              <li key={i}>{target}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Promotion Details:</h3>
          <ul>
            {promotion.promotionDetails.map((detail, i) => (
              <li key={i}>
                <div className="flex items-center gap-2">
                  <CircleDollarSign /> Promotional Price:{" "}
                  {detail.promotionalPrice}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Duration:</h3>
          <div className="mt-2 flex gap-2">
            <div className="flex items-center gap-4">
              {" "}
              <CalendarCheck /> {new Date(promotion.beginsAt).toLocaleString()}
            </div>
            <ArrowBigRight />
            <div className="flex items-center gap-2">
              <CalendarClock />
              {new Date(promotion.endsAt).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
