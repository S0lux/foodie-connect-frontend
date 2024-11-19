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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { getAvatarUrl } from "@/lib/handleImage";
import useSetting from "@/hooks/use-setting";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import Loader from "@/components/loader";
import TermsAndConditions from "@/app/(main)/settings/_components/terms-and-conditions";

const UserSettingBody = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  avatar: z.string(),
  type: z.enum(["Head", "User"]),
});

type UserSettingBodyType = z.infer<typeof UserSettingBody>;

export default function SettingForm() {
  const { data: user, refetch, isLoading, isError } = useAuth.useGetSession();
  const form = useForm<UserSettingBodyType>({
    resolver: zodResolver(UserSettingBody),
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      phone: user?.phoneNumber,
      avatar: getAvatarUrl(user?.avatar),
      type:
        user?.type === "Head" || user?.type === "User" ? user.type : undefined,
    },
  });

  const headUploadImage = useSetting.useHeadChangeAvatar();
  const userUploadImage = useSetting.useUserChangeAvatar();

  const [loading, setLoading] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const defaultAvatar = getAvatarUrl(user?.avatar, user?.displayName);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    form.reset({
      name: user?.displayName,
      email: user?.email,
      phone: user?.phoneNumber,
      avatar: getAvatarUrl(user?.avatar, user?.displayName),
      type:
        user?.type === "Head" || user?.type === "User" ? user.type : undefined,
    });
  }, [user]);

  const handleUploadImage = async (uploadedImage: File) => {
    if (loading) return;
    setLoading(true);
    if (user?.type === "Head") {
      try {
        await headUploadImage.mutateAsync({
          headId: user?.id,
          avatar: uploadedImage,
        });
        toast({
          title: "Success",
          description: "Avatar changed successfully",
        });
        handleResetImage();
        refetch();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "NOT_AUTHENTICATED":
            toast({
              title: "Error",
              description: "You are not authenticated",
              variant: "destructive",
            });
            break;
          case "TYPE_NOT_ALLOWED":
            toast({
              title: "Error",
              description: "Type not allowed",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHORIZED":
            toast({
              title: "Error",
              description: "You are not authorized",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
            break;
        }
      }
    } else {
      try {
        await userUploadImage.mutateAsync({
          userId: user?.id ?? "",
          avatar: uploadedImage,
        });
        toast({
          title: "Success",
          description: "Avatar changed successfully",
        });
        handleResetImage();
        refetch();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "NOT_AUTHENTICATED":
            toast({
              title: "Error",
              description: "You are not authenticated",
              variant: "destructive",
            });
            break;
          case "TYPE_NOT_ALLOWED":
            toast({
              title: "Error",
              description: "Type not allowed",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHORIZED":
            toast({
              title: "Error",
              description: "You are not authorized",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
            break;
        }
      }
    }
    setLoading(false);
  };

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
        setImage(file);
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
    setImage(null);
    form.setValue("avatar", defaultAvatar, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const onSubmit = () => {
    router.push("/");
  };

  if (isError) return <div>Error</div>;

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

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
              alt="avatar"
            />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
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
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => {
              inputFile.current?.click();
            }}
          >
            Change Avatar
          </Button>
          {image && (
            <Button
              size={"lg"}
              onClick={() => {
                handleUploadImage(image);
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Upload"}
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80">
        <Form {...form}>
          <form
            onSubmit={onSubmit}
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
                        readOnly
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
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-1 flex-col">
                    <FormLabel className="text-[16px] font-bold">
                      Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px]"
                        placeholder="Enter your type"
                        {...field}
                        readOnly
                      />
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

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="mt-4"
                    variant={"outline"}
                    size={"lg"}
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                      Change Password
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Password must be at least 8 characters long
                    </DialogDescription>
                  </DialogHeader>
                  {user?.type && user?.id && (
                    <ChangePasswordForm
                      type={user.type}
                      id={user.id}
                      onSuccess={() => {
                        setIsDialogOpen(false);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {user?.type === "User" && (
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Label className="text-[16px] font-bold">Upgrade Head</Label>
                  <p className="text-sm md:text-[16px]">Upgrade user to head</p>
                </div>

                <Dialog
                  open={isUpgradeDialogOpen}
                  onOpenChange={setIsUpgradeDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="mt-4"
                      variant={"outline"}
                      size={"lg"}
                      onClick={() => setIsUpgradeDialogOpen(true)}
                    >
                      Upgrade
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-full rounded-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl">
                        Upgrade Head
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        Please read these terms and conditions carefully before
                        upgrading to a Head Account
                      </DialogDescription>
                    </DialogHeader>
                    <TermsAndConditions userId={user.id} />
                  </DialogContent>
                </Dialog>
              </div>
            )}

            <div className="!mt-8 flex justify-end gap-3">
              <Button
                className=""
                size={"lg"}
                type="button"
                onClick={() => router.back()}
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
