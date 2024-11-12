"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigLeftDashIcon, Upload } from "lucide-react";
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
import useDishes from "@/hooks/use-dishes";
import {
  DishBody,
  DishBodyType,
  UpdateDishBody,
  UpdateDishBodyType,
} from "@/schema/dish.schema";
import useDishCategories from "@/hooks/use-dish-categories";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { ErrorType } from "@/types/error.type";
import { toast } from "@/hooks/use-toast";

const UpdateMenuItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: categories } =
    useDishCategories.useGetDishCategories(restaurantId);
  const { data: dish, isLoading } = useDishes.useGetDish(id);
  console.log("Dish:", dish);
  const router = useRouter();
  const uploadImageAction = useDishes.useUploadDishImage();
  const updateDishAction = useDishes.useUpdateDish();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<UpdateDishBodyType>({
    resolver: zodResolver(UpdateDishBody),
    defaultValues: {
      name: dish?.name,
      price: dish?.price,
      description: dish?.description,
      categories: dish?.categories,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      name: dish?.name,
      price: dish?.price,
      description: dish?.description,
      categories: dish?.categories,
    });
  }, [dish]);

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

  const updateImage = async () => {
    console.log(image);
    if (image) {
      try {
        await uploadImageAction.mutateAsync({
          dishId: id,
          image,
        });
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
              description: "Menu item not found",
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
      }
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await updateDishAction.mutateAsync({
        dishId: id,
        dishDetails: values,
      });
      toast({
        title: "Success",
        description: "Menu item update successfully",
      });
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
            description: "Menu item not found",
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
      setIsSubmitting(false);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 flex gap-2">
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowBigLeftDashIcon size={20} /> Back to menu
        </Button>
        <h1 className="text-3xl font-bold">Update Menu Item</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Dish details</CardTitle>
                <CardDescription>
                  Update the details of the menu item
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
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
                <div className="mt-6 flex justify-center gap-3">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Item"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Item Image</Label>
                  <div className="rounded-lg aspect-video overflow-hidden border">
                    <Image
                      src={
                        imagePreview || "https://api.dicebear.com/9.x/glass/svg"
                      }
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

                <div className="mt-6 flex justify-center gap-3">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => updateImage()}
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Image"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateMenuItemPage;
