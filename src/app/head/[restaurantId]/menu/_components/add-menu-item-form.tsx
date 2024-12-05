"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { DishBody, DishBodyType } from "@/schema/dish.schema";
import useDishCategories from "@/hooks/use-dish-categories";
import Image from "next/image";
import useDishes from "@/hooks/use-dishes";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import Loader from "@/components/loader";

const AddMenuItemPage = () => {
  const createDishAction = useDishes.useCreateDish();
  const uploadImageAction = useDishes.useUploadDishImage();
  const [loading, setLoading] = useState(false);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: categories, isLoading } =
    useDishCategories.useGetDishCategories(restaurantId);

  const form = useForm<DishBodyType>({
    resolver: zodResolver(DishBody),
    defaultValues: {
      restaurantId: restaurantId,
      name: "",
      price: 0,
      description: "",
      categories: [],
    },
  });

  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImagePreview(imageDataUrl);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await createDishAction.mutateAsync(values);
      if (!image) {
        toast({
          title: "Success",
          description: "Menu item added successfully",
        });
      }

      if (image) {
        try {
          await uploadImageAction.mutateAsync({
            dishId: data.dishId,
            image: image,
          });
          toast({
            title: "Success",
            description: "Menu item added successfully",
          });
          router.push(`/head/${restaurantId}/menu`);
        } catch (error) {
          toast({
            title: "Error",
            description: (error as ErrorType).message,
            variant: "destructive",
          });
        }
      }
      router.push(`/head/${restaurantId}/menu`);
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
        case "NAME_ALREADY_EXISTS":
          toast({
            title: "Error",
            description: "A menu item with this name already exists",
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
      setLoading(false);
    }
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Add New Menu Item</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the price"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Category
                      </FormLabel>
                      {categories?.map((category) => (
                        <div
                          key={category.categoryName}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={category.categoryName}
                            checked={field.value?.includes(
                              category.categoryName,
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    category.categoryName,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) =>
                                        value !== category.categoryName,
                                    ),
                                  );
                            }}
                          />
                          <Label htmlFor={category.categoryName}>
                            {category.categoryName}
                          </Label>
                        </div>
                      ))}
                      <FormDescription>
                        Choose the category for the menu item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <div className="mb-6 mt-6 flex justify-center gap-3">
                <Button
                  type="button"
                  size={"lg"}
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" size={"lg"} disabled={loading}>
                  {loading ? "Adding..." : "Add Item"}
                </Button>
              </div>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Item Image</Label>
                  <div className="rounded-lg flex aspect-video items-center justify-center overflow-hidden border">
                    <Image
                      src={imagePreview || "/images/no_image_dish.png"}
                      alt="Preview"
                      width={230}
                      height={150}
                      layout="responsive"
                    />
                  </div>
                  <Label
                    htmlFor="image-upload"
                    className="rounded-lg flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed px-6 py-4 hover:bg-gray-50"
                  >
                    <Upload size={20} />
                    <span>Click to upload image</span>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-center text-sm text-gray-500">
                    Supported formats: JPG, PNG. Max file size: 5MB
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddMenuItemPage;
