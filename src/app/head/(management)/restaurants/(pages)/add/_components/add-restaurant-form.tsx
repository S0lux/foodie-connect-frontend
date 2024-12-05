"use client";

import React, { use, useEffect, useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import {
  CreateRestaurantBody,
  CreateRestaurantBodyType,
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

const AddRestaurantForm = () => {
  const [office, setOffice] = useState<google.maps.LatLngLiteral | null>(null);
  const [formatAddress, setFormatAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const createRestaurantAction = useRestaurants.useCreateRestaurant();

  const form = useForm<CreateRestaurantBodyType>({
    resolver: zodResolver(CreateRestaurantBody),
    defaultValues: {
      name: "",
      openTime: "",
      closeTime: "",
      longitudeLatitude: "",
      status: "Open",
      phone: "",
    },
  });

  useEffect(() => {
    form.setValue(
      "longitudeLatitude",
      office ? `${office.lng},${office.lat}` : "",
    );
  }, [office]);

  const router = useRouter();
  console.log("office", office);

  console.log(form.getValues());

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);

    try {
      await createRestaurantAction.mutateAsync(values);
      toast({
        title: "Restaurant added",
        description: "Restaurant has been added successfully",
      });
      router.push("/head/restaurants");
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

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Add Restaurant</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 gap-8">
            <div className="flex w-full justify-center">
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
                              value={
                                office ? `${office.lng},${office.lat}` : ""
                              }
                              readOnly
                              hidden={true}
                            />
                          </FormControl>
                          <FormControl className="">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="outline">
                                  Select Location
                                </Button>
                              </SheetTrigger>
                              <SheetContent side={"bottom"} className="h-4/5">
                                <SheetHeader>
                                  <SheetTitle>Select location</SheetTitle>
                                  <SheetDescription></SheetDescription>
                                </SheetHeader>
                                <Map
                                  children={
                                    <SheetClose asChild>
                                      <Button type="submit">
                                        Save changes
                                      </Button>
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

                  <div className="flex gap-5">
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
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormDescription>
                            Select opening hours
                          </FormDescription>
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
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormDescription>
                            Select closing hours
                          </FormDescription>
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
                      {loading ? "Adding..." : "Add Item"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRestaurantForm;
