import useDishCategories from "@/hooks/use-dish-categories";
import {
  UpdateDishCategoryBody,
  UpdateDishCategoryBodyType,
} from "@/schema/dishCategories.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { ErrorType } from "@/types/error.type";

export default function UpdateCategoryForm({
  onSuccess,
  categoryName,
}: {
  categoryName: string;
  onSuccess: () => void;
}) {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const updateCategory = useDishCategories.useUpdateDishCategory();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<UpdateDishCategoryBodyType>({
    resolver: zodResolver(UpdateDishCategoryBody),
    defaultValues: {
      newName: categoryName,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      newName: categoryName,
    });
  }, [categoryName]);

  async function onSubmit(values: UpdateDishCategoryBodyType) {
    console.log(values);
    if (loading) return;
    setLoading(true);
    try {
      const data = await updateCategory.mutateAsync({
        restaurantId,
        categoryName,
        newName: values,
      });
      console.log(data);
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      onSuccess();
    } catch (error) {
      console.log(error);
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
            description: "You are not the owner",
            variant: "destructive",
          });
          break;
        case "RESTAURANT_NOT_EXIST":
          toast({
            title: "Error",
            description: "Restaurant does not exist",
            variant: "destructive",
          });
          break;
        case "DISH_CATEGORY_ALREADY_EXIST":
          toast({
            title: "Error",
            description: "Category already exists",
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
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="newName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Category Name</FormLabel>
                <FormControl>
                  <Input
                    className="h-[60px]"
                    placeholder="Enter category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="!mt-8 h-[60px] w-full text-xl">
            Update Category
          </Button>
        </form>
      </Form>
    </>
  );
}
