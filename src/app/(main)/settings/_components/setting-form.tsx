"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangePasswordForm from "@/app/(main)/settings/_components/change-password-form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const UserSettingBody = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  address: z.string().min(10),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  avatar: z.string(),
});

type UserSettingBodyType = z.infer<typeof UserSettingBody>;

export default function SettingForm() {
  const [date, setDate] = useState<Date>();

  const form = useForm<UserSettingBodyType>({
    resolver: zodResolver(UserSettingBody),
    defaultValues: {
      name: "Khang Bui",
      email: "buoiduykhang@gmail.com",
      address: "123 Tran Duy Hung - Cau Giay - Ha Noi",
      phone: "0123456789",
      dateOfBirth: "1-1-2000",
      avatar: "https://placehold.co/400",
    },
  });

  const inputFile = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const defaultAvatar = "https://placehold.co/400";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImagePreview(imageDataUrl);
        form.setValue("avatar", imageDataUrl, {
          shouldValidate: true,
          shouldDirty: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setImagePreview(null);
    form.setValue("avatar", defaultAvatar, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const onSubmit = form.handleSubmit((values) => {
    setIsSubmitting(true);
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  const router = useRouter();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        <div className="relative">
          <Avatar className="size-[150px]">
            <AvatarImage
              src={imagePreview || form.watch("avatar")}
              alt="KhangBuoi"
            />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>
          {imagePreview && (
            <Button
              variant={"outline"}
              size={"icon"}
              className="absolute right-0 top-0 z-10 rounded-full"
              onClick={handleResetImage}
            >
              <X />
            </Button>
          )}
        </div>
        <div>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => {
              inputFile.current?.click();
            }}
          >
            Change Avatar
          </Button>
        </div>
      </div>
      <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-shrink-0 space-y-4"
            noValidate
          >
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[16px] font-bold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px]"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[16px] font-bold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px]"
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-bold">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className=""
                      placeholder="Enter your address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-[16px] font-bold">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[48px]"
                          placeholder="Enter your phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-1 flex-col">
                    <FormLabel className="text-[16px] font-bold">
                      Date Of Birth
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-[48px] w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              setDate(date);
                              if (date) {
                                form.setValue(
                                  "dateOfBirth",
                                  format(date, "d-M-yyyy"),
                                );
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <div className="space-y-2">
                <Label className="text-[16px] font-bold">Password</Label>
                <p className="text-sm md:text-[16px]">
                  Password must be at least 8 characters long
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4" variant={"outline"} size={"lg"}>
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Change Password
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Password must be at least 8 characters long
                    </DialogDescription>
                  </DialogHeader>
                  <ChangePasswordForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="!mt-8 flex justify-end gap-3">
              <Button
                className=""
                variant={"outline"}
                size={"lg"}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className=""
                type="submit"
                size={"lg"}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
