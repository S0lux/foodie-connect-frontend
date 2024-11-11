import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Review } from "@/types/dishrivews.type";

const Rating = ({ value }: { value: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(<span key={i}>&#9733;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }
  return <div className="flex">{stars}</div>;
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={review.author.avatar}
            alt={review.author.displayName}
            width={40}
            height={40}
            className="mr-2 rounded-full"
          />
          <div>
            <h3 className="font-bold">{review.author.displayName}</h3>
            <p className="text-sm text-gray-500">@{review.author.userName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Rating value={review.rating} />
        <p className="mt-2">{review.content}</p>
        <p className="mt-2 text-sm text-gray-500">
          Created at: {new Date(review.createdAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
