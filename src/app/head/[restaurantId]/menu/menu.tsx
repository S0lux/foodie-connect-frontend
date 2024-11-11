"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteDish from "@/app/head/[restaurantId]/menu/_components/delete-menu-item";
import { useParams } from "next/navigation";
import useDishCategories from "@/hooks/use-dish-categories";
import useDishes from "@/hooks/use-dishes";
import Loader from "@/components/loader";
import Image from "next/image";
import cld from "@/lib/cld";

const MenuManagement = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: categories } =
    useDishCategories.useGetDishCategories(restaurantId);
  const {
    data: dishes,
    isLoading,
    isError,
  } = useDishes.useGetDishes(restaurantId);
  console.log(dishes);
  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );

  const getImageUrl = (imageId: string | null) => {
    if (!imageId) return "";
    const [imagePath, imageVersion] = imageId.split(".");
    return cld.image(imagePath).setVersion(imageVersion).toURL();
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter menu items by category
  const filteredItems =
    selectedCategory === "all"
      ? dishes
      : dishes?.filter((item) => item.categories.includes(selectedCategory));

  // Get category name by id
  const getCategoryName = (name: string) => {
    const category = categories?.find((cat) => cat.categoryName === name);
    return category ? category.categoryName : "";
  };

  // Handle delete item
  const handleDeleteItem = (id: string) => {
    console.log(id);
  };

  if (isError) return <div>Error</div>;

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-3xl">Menu Management</h1>
        <Button>
          <Link className="flex items-center gap-2" href="/head/Loc/menu/add">
            <Plus size={16} />
            Add New Item
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          All Items
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.categoryName}
            variant={
              selectedCategory === category.categoryName ? "default" : "outline"
            }
            onClick={() => setSelectedCategory(category.categoryName)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems?.map((item) => (
          <Card key={item.dishId} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={
                  getImageUrl(item.imageId) || "https://placehold.co/230x150"
                }
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(item.price)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="mb-4 text-gray-600">{item.description}</p>

              <div className="flex gap-1">
                {item.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    <span>{getCategoryName(category)}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="icon">
                <Link href={`/head/${restaurantId}/menu/update/${item.dishId}`}>
                  <Edit size={16} />
                </Link>
              </Button>
              <DeleteDish onDelete={() => handleDeleteItem(item.dishId)} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
