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
import { Plus, Edit, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteDish from "@/app/head/[restaurantId]/menu/_components/delete-menu-item";
import { useParams, useRouter } from "next/navigation";
import useDishCategories from "@/hooks/use-dish-categories";
import useDishes from "@/hooks/use-dishes";
import Loader from "@/components/loader";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import { getDefaultImageUrl } from "@/lib/handleImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "@/app/head/[restaurantId]/menu/_components/add-category-form";
import DeleteCategory from "@/app/head/[restaurantId]/menu/_components/delete-category";
import UpdateCategoryForm from "@/app/head/[restaurantId]/menu/_components/update-category-form";

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

const EditMode = ({
  categoryName,
  onDelete,
  isDialogOpen,
  setIsDialogOpen,
  refetchCategories,
}: {
  categoryName: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  refetchCategories: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex gap-1">
      {/* <Button variant="outline" size="icon" onClick={() => onEdit()}>
        <Edit size={16} />
      </Button> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className=""
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsDialogOpen(true)}
          >
            <Edit size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle className="text-center">Update Category</DialogTitle>
            <DialogDescription className="text-center">
              Update the category name
            </DialogDescription>
          </DialogHeader>
          <UpdateCategoryForm
            categoryName={categoryName}
            onSuccess={() => {
              setIsDialogOpen(false);
              refetchCategories();
            }}
          />
        </DialogContent>
      </Dialog>
      <DeleteCategory onDelete={() => onDelete()} />
    </div>
  );
};

const MenuManagement = () => {
  const [edit, setEdit] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useDishCategories.useGetDishCategories(restaurantId);
  const {
    data: dishes,
    isLoading,
    isError,
    refetch,
  } = useDishes.useGetDishes(restaurantId);
  console.log(dishes);
  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );
  const deleteDishAction = useDishes.useDeleteDish();
  const deleteCategory = useDishCategories.useDeleteDishCategory();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const handleEditCategory = (categoryName: string) => {
    setEditCategoryName(categoryName);
  };
  const handleCloseEditDialog = () => {
    setEditCategoryName(null);
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

  // Handle delete category
  const handleDeleteCategory = async (categoryName: string) => {
    if (isLoadingCategories) return;
    try {
      await deleteCategory.mutateAsync({
        restaurantId,
        categoryName,
      });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      refetchCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    }
  };

  // Handle delete item
  const handleDeleteItem = async (id: string) => {
    if (isLoadingDelete) return;
    setIsLoadingDelete(true);
    try {
      await deleteDishAction.mutateAsync(id);
      toast({
        title: "Success",
        description: "Dish deleted successfully",
      });
      refetch();
    } catch (error) {
      console.error({ error });
      switch ((error as ErrorType).code) {
        case "NOT_AUTHENTICATED":
          toast({
            title: "Error",
            description: "You are not authenticated",
            variant: "destructive",
          });
          break;
        case "NOT_OWNER":
          toast({
            title: "Error",
            description: "You are not the owner of this restaurant",
            variant: "destructive",
          });
          break;
        case "DISH_NOT_FOUND":
          toast({
            title: "Error",
            description: "Dish not found",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          });
          break;
      }
    } finally {
      setIsLoadingDelete(false);
    }
  };

  if (isError) return <div>Error</div>;

  if (isLoading || isLoadingCategories || !dishes || !categories)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      {isLoadingDelete ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <></>
      )}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-3xl">Menu Management</h1>
        <Link
          className="flex items-center gap-2"
          href={`/head/${restaurantId}/menu/add`}
        >
          <Button>
            <Plus size={16} />
            Add New Item
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          All Items
        </Button>
        {categories?.map((category) => (
          <div
            className={`flex gap-2 rounded-md border-input ${edit ? "border" : "border-none"} `}
          >
            <Button
              disabled={edit}
              className={`${edit ? "border-none" : ""}`}
              key={category.categoryName}
              variant={
                selectedCategory === category.categoryName
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedCategory(category.categoryName)}
            >
              <p> {category.categoryName}</p>
            </Button>
            {edit ? (
              <EditMode
                categoryName={category.categoryName}
                isDialogOpen={editCategoryName === category.categoryName}
                setIsDialogOpen={(isOpen) =>
                  isOpen
                    ? handleEditCategory(category.categoryName)
                    : handleCloseEditDialog()
                }
                refetchCategories={refetchCategories}
                onDelete={() => handleDeleteCategory(category.categoryName)}
              />
            ) : (
              <></>
            )}
          </div>
        ))}
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className=""
                variant={"secondary"}
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={16} />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Add New Category
                </DialogTitle>
                <DialogDescription className="text-center">
                  Add a new category to your menu
                </DialogDescription>
              </DialogHeader>
              <AddCategoryForm
                onSuccess={() => {
                  setIsDialogOpen(false);
                  refetchCategories();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Button onClick={() => setEdit(!edit)}>
          <Pen /> Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems?.map((item) => (
          <Card key={item.dishId} className="overflow-hidden">
            <div className="relative flex h-48 items-center">
              <Image
                src={
                  getDefaultImageUrl(
                    item?.imageId ? [item.imageId] : [],
                    item.name,
                  ) || "/images/no_image_dish.png"
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
            <CardFooter className="flex justify-between gap-2">
              <Rating value={item.scoreOverview.averageRating} />
              <div>
                <Link href={`/head/${restaurantId}/menu/update/${item.dishId}`}>
                  <Button variant="outline" size="icon">
                    <Edit size={16} />
                  </Button>
                </Link>
                <DeleteDish onDelete={() => handleDeleteItem(item.dishId)} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
