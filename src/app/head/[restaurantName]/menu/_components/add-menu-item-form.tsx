"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
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

const DishBody = z.object({
  name: z.string(),
  price: z.coerce.number().positive(),
  description: z.string(),
  categoryId: z.string(),
  image: z.string(),
  status: z.string(),
});

type DishBodyType = z.infer<typeof DishBody>;

const initialCategories = [
  { id: "1", name: "Appetizer" },
  { id: "2", name: "Main course" },
  { id: "3", name: "Dessert" },
  { id: "4", name: "Beverages" },
];

const AddMenuItemPage = () => {
  const { restaurantName } = useParams<{ restaurantName: string }>();
  const form = useForm<DishBodyType>({
    resolver: zodResolver(DishBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categoryId: "1",
      image: "https://placehold.co/230x150",
      status: "available",
    },
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        // Update the form value with the new image
        form.setValue("image", imageDataUrl, {
          shouldValidate: true,
          shouldDirty: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = form.handleSubmit((values) => {
    setIsSubmitting(true);
    try {
      console.log(values);
      router.push(`/head/${restaurantName}/menu`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  });

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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {initialCategories.map((category) => (
                            <SelectGroup key={category.id}>
                              <SelectItem
                                className="hover:cursor-pointer"
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the category for the menu item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="unavailable">
                              Unavailable
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the status for the menu item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Item Image</Label>
                  <div className="rounded-lg aspect-video overflow-hidden border">
                    <img
                      src={imagePreview || form.watch("image")}
                      alt="Preview"
                      className="h-full w-full object-cover"
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
                    size={"lg"}
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size={"lg"} disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Item"}
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

export default AddMenuItemPage;
