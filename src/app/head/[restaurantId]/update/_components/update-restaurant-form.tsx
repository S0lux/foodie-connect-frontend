"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { use, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigLeftDashIcon, Upload, X } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import {
  CreateRestaurantBody,
  UpdateRestaurantBodyType,
} from "@/schema/restaurant.schema";
import TimePicker from "@/components/time-picker";
import useRestaurants from "@/hooks/use-restaurants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Map from "@/components/geocoding/map";
import { getBannerUrl, getLogoUrl } from "@/lib/handleImage";
import Image from "next/image";
import Loader from "@/components/loader";

const UpdateRestaurantForm = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: restaurant, isLoading } =
    useRestaurants.useGetRestaurant(restaurantId);
  const [office, setOffice] = useState<google.maps.LatLngLiteral | null>(null);
  const [formatAddress, setFormatAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateRestaurantAction = useRestaurants.useUpdateRestaurant();
  const updateLogoAction = useRestaurants.useUpdateRestaurantLogo();
  const updateBannerAction = useRestaurants.useUpdateRestaurantBanner();

  const form = useForm<UpdateRestaurantBodyType>({
    resolver: zodResolver(CreateRestaurantBody),
    defaultValues: {
      name: restaurant?.name,
      openTime: restaurant?.openTime?.toString(),
      closeTime: restaurant?.closeTime?.toString(),
      longitudeLatitude: `${restaurant?.longitude},${restaurant?.latitude}`,
      status: restaurant?.status,
      phone: restaurant?.phone,
    },
    mode: "onChange",
  });
  const inputLogoRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLogoUpdated, setIsLogoUpdated] = useState(false);

  const inputBannerRef = useRef<HTMLInputElement>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isBannerUpdated, setIsBannerUpdated] = useState(false);

  useEffect(() => {
    form.reset({
      name: restaurant?.name,
      openTime: restaurant?.openTime?.toString(),
      closeTime: restaurant?.closeTime?.toString(),
      longitudeLatitude: `${restaurant?.longitude},${restaurant?.latitude}`,
      status: restaurant?.status,
      phone: restaurant?.phone,
    });
    setOffice({
      lat: restaurant?.latitude ?? 0,
      lng: restaurant?.longitude ?? 0,
    });
    setFormatAddress(restaurant?.formattedAddress || "");
  }, [restaurant]);

  useEffect(() => {
    form.setValue(
      "longitudeLatitude",
      office ? `${office.lng},${office.lat}` : "",
    );
  }, [office]);

  const router = useRouter();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setLogoPreview(imageDataUrl);
        setLogo(file);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
      setLogo(null);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setBannerPreview(imageDataUrl);
        setBanner(file);
      };
      reader.readAsDataURL(file);
    } else {
      setBannerPreview(null);
      setBanner(null);
    }
  };

  const updateLogo = async () => {
    if (loading) return;
    setLoading(true);
    console.log("update logo");
    if (logo) {
      try {
        await updateLogoAction.mutateAsync({
          restaurantId: restaurantId,
          logo,
        });
        toast({
          title: "Logo updated",
          description: "Logo has been updated successfully",
        });
        setIsLogoUpdated(true);
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
  };

  const updateBanner = async () => {
    if (loading) return;
    setLoading(true);
    if (banner) {
      try {
        await updateBannerAction.mutateAsync({
          restaurantId: restaurantId,
          banner,
        });
        toast({
          title: "Banner updated",
          description: "Banner has been updated successfully",
        });
        setIsBannerUpdated(true);
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
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    try {
      await UpdateRestaurantAction.mutateAsync({
        restaurantId: restaurantId,
        restaurantDetails: values,
      });
      toast({
        title: "Restaurant updated",
        description: "Restaurant has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
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
      <div className="mb-4 flex gap-2">
        <h1 className="text-3xl font-bold">Update Restaurant</h1>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the phone number"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitudeLatitude"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-[16px] font-bold">
                        Location
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Selected location"
                            value={office ? `${formatAddress}` : ""}
                            readOnly
                          />
                        </FormControl>
                        <FormControl className="hidden">
                          <Input
                            placeholder="Selected location"
                            {...field}
                            value={office ? `${office.lng},${office.lat}` : ""}
                            readOnly
                            hidden={true}
                          />
                        </FormControl>
                        <FormControl className="">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline">Select Location</Button>
                            </SheetTrigger>
                            <SheetContent side={"bottom"} className="h-4/5">
                              <SheetHeader>
                                <SheetTitle>Select location</SheetTitle>
                                <SheetDescription></SheetDescription>
                              </SheetHeader>
                              <Map
                                children={
                                  <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                  </SheetClose>
                                }
                                setFormatAddress={setFormatAddress}
                                office={office}
                                setOffice={setOffice}
                              />
                              <SheetFooter></SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </FormControl>
                      </div>
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
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={restaurant?.status}
                        >
                          <SelectTrigger className="flex h-[48px] items-center">
                            {" "}
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              className="hover:cursor-pointer"
                              value="Open"
                            >
                              Open
                            </SelectItem>
                            <SelectItem
                              className="hover:cursor-pointer"
                              value="Closed"
                            >
                              Closed
                            </SelectItem>
                            <SelectItem
                              className="hover:cursor-pointer"
                              value="PermanentlyClosed"
                            >
                              Permanently Closed
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  {" "}
                  <FormField
                    control={form.control}
                    name="openTime"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-[16px] font-bold">
                          Open Time
                        </FormLabel>
                        <TimePicker
                          value={
                            field.value ??
                            restaurant?.openTime?.toString() ??
                            ""
                          }
                          onChange={field.onChange}
                        />
                        <FormDescription>Select opening hours</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="closeTime"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-[16px] font-bold">
                          Close Time
                        </FormLabel>
                        <TimePicker
                          value={
                            field.value ??
                            restaurant?.closeTime?.toString() ??
                            ""
                          }
                          onChange={field.onChange}
                        />
                        <FormDescription>Select closing hours</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <Button type="submit" size={"lg"} disabled={loading}>
                    {loading ? "Adding..." : "Update Restaurant"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <FormLabel className="mb-4 block text-[16px] font-bold">
                    Restaurant Logo
                  </FormLabel>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {logoPreview ? (
                        <div className="relative flex h-40 w-40 items-center justify-center">
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            width={160}
                            height={160}
                          />
                          {!isLogoUpdated && (
                            <Button
                              type="button"
                              variant={"destructive"}
                              size="icon"
                              className="absolute right-[-8px] top-[-8px] z-10 rounded-full"
                              onClick={() => {
                                setLogo(null);
                                setLogoPreview(null);
                                inputLogoRef.current!.value = "";
                                setIsLogoUpdated(false);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-lg flex h-40 w-40 items-center justify-center bg-gray-100">
                          {restaurant && (
                            <Image
                              src={getLogoUrl(
                                restaurant.images,
                                restaurant.name,
                              )}
                              alt="Logo preview"
                              width={160}
                              height={160}
                            />
                          )}
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                          <Label
                            htmlFor="logo-upload"
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Logo
                          </Label>
                          {logoPreview && !isLogoUpdated && (
                            <Button
                              type="button"
                              size={"lg"}
                              onClick={() => updateLogo()}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </Button>
                          )}
                        </div>
                        <Input
                          id="logo-upload"
                          type="file"
                          ref={inputLogoRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                        <FormDescription>
                          Recommended size: 400x400px
                        </FormDescription>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <FormLabel className="mb-4 block text-[16px] font-bold">
                    Restaurant Banner
                  </FormLabel>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {bannerPreview ? (
                        <div className="relative h-48 w-full">
                          <img
                            src={bannerPreview}
                            alt="Banner preview"
                            className="rounded-lg h-full w-full object-cover"
                          />
                          {!isBannerUpdated && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute right-[-8px] top-[-8px] z-10 rounded-full"
                              onClick={() => {
                                setBannerPreview(null);
                                setBanner(null);
                                inputBannerRef.current!.value = "";
                                setIsBannerUpdated(false);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-lg flex h-48 w-full items-center justify-center bg-gray-100">
                          {restaurant && (
                            <div className="relative h-48 w-full">
                              <Image
                                src={getBannerUrl(
                                  restaurant.images,
                                  restaurant.name,
                                )}
                                alt="Banner preview"
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                          <Label
                            htmlFor="banner-upload"
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Banner
                          </Label>
                          {bannerPreview && !isBannerUpdated && (
                            <Button
                              type="button"
                              size={"lg"}
                              onClick={() => updateBanner()}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </Button>
                          )}
                        </div>
                        <Input
                          id="banner-upload"
                          type="file"
                          ref={inputBannerRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleBannerUpload}
                        />
                        <FormDescription>
                          Recommended size: 1200x400px
                        </FormDescription>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default UpdateRestaurantForm;
