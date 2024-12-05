import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { ErrorType } from "@/types/error.type";
import { CreateSocialBody, CreateSocialBodyType } from "@/schema/social.schema";
import useSocials from "@/hooks/use-socials";

export default function AddSocialForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateSocialBodyType>({
    resolver: zodResolver(CreateSocialBody),
    defaultValues: {
      platformType: "Facebook",
      url: "",
    },
  });
  const createSocial = useSocials.useCreateSocial();

  async function onSubmit(values: CreateSocialBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await createSocial.mutateAsync({
        restaurantId,
        socialDetails: values,
      });
      console.log(values);
      toast({
        title: "Success",
        description: "Social added successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
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
            name="platformType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  Platform Type
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="flex h-[48px] items-center">
                      {" "}
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="hover:cursor-pointer"
                        value="Facebook"
                      >
                        Facebook
                      </SelectItem>
                      <SelectItem
                        className="hover:cursor-pointer"
                        value="Twitter"
                      >
                        Twitter
                      </SelectItem>
                      <SelectItem
                        className="hover:cursor-pointer"
                        value="Tiktok"
                      >
                        Tiktok
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the type of social platform you are adding
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">Url</FormLabel>
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

          <Button type="submit" size={"lg"} className="!mt-8 w-full">
            Add Social
          </Button>
        </form>
      </Form>
    </>
  );
}
