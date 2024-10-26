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
import { Plus, Edit, Trash2, Delete } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteDish from "@/app/head/[restaurantName]/menu/_components/delete-menu-item";

const initialCategories = [
  { id: 1, name: "Appetizer" },
  { id: 2, name: "Main course" },
  { id: 3, name: "Dessert" },
  { id: 4, name: "Beverages" },
];

type Dish = {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
  status: string;
};

const initialMenuItems = [
  {
    id: "1",
    name: "Spring Rolls",
    price: 50000,
    image: "https://placehold.co/230x150",
    description: "Crispy spring rolls with vegetables",
    categoryId: 1,
    status: "available",
  },
  {
    id: "2",
    name: "Grilled Chicken",
    price: 150000,
    image: "https://placehold.co/230x150",
    description: "Grilled chicken with herbs",
    categoryId: 2,
    status: "available",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    price: 70000,
    image: "https://placehold.co/230x150",
    description: "Rich chocolate cake",
    categoryId: 3,
    status: "available",
  },
  {
    id: "4",
    name: "Lemonade",
    price: 30000,
    image: "https://placehold.co/230x150",
    description: "Fresh lemonade",
    categoryId: 4,
    status: "out_of_stock",
  },
];

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<Dish[]>(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all",
  );

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
      ? menuItems
      : menuItems.filter((item) => item.categoryId === selectedCategory);

  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = initialCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  // Handle delete item
  const handleDeleteItem = (id: string) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Menu Management</h1>
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
        {initialCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <Badge
                className="absolute right-2 top-2"
                variant={
                  item.status === "available" ? "default" : "destructive"
                }
              >
                {item.status === "available" ? "Available" : "Out of Stock"}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(item.price)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-gray-600">{item.description}</p>
              <Badge variant="outline">
                {getCategoryName(item.categoryId)}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="icon">
                <Link href={`/head/Loc/menu/update/${item.id}`}>
                  <Edit size={16} />
                </Link>
              </Button>
              <DeleteDish onDelete={() => handleDeleteItem(item.id)} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
