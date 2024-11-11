"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Restaurant } from "@/types/restaurant.type";
import RestaurantCard from "@/app/head/(management)/restaurants/_components/restaurant-card";
import useAuth from "@/hooks/use-auth";
import useRestaurants from "@/hooks/use-restaurants";

// Mock data
// const restaurants: Restaurant[] = [
//   {
//     id: "1",
//     name: "The Gourmet Kitchen",
//     openTime: 9,
//     closeTime: 22,
//     status: "Open",
//     socialLinks: [
//       {
//         id: "1",
//         restaurantId: "1",
//         platformType: "Facebook",
//         url: "https://facebook.com/thegourmetkitchen",
//       },
//       {
//         id: "2",
//         restaurantId: "1",
//         platformType: "Instagram",
//         url: "https://instagram.com/thegourmetkitchen",
//       },
//     ],
//     phone: "123-456-7890",
//     images: [
//       "https://example.com/image1.jpg",
//       "https://example.com/image2.jpg",
//     ],
//     formattedAddress: "123 Main St, Anytown, USA",
//     latitude: 40.7128,
//     longitude: -74.006,
//     headId: "head1",
//     createdAt: "2023-01-01T00:00:00Z",
//   },
//   {
//     id: "2",
//     name: "Fast Food Fiesta",
//     openTime: 10,
//     closeTime: 23,
//     status: "Closed",
//     socialLinks: [
//       {
//         id: "3",
//         restaurantId: "2",
//         platformType: "Twitter",
//         url: "https://twitter.com/fastfoodfiesta",
//       },
//     ],
//     phone: "987-654-3210",
//     images: [
//       "https://example.com/image3.jpg",
//       "https://example.com/image4.jpg",
//     ],
//     formattedAddress: "456 Elm St, Othertown, USA",
//     latitude: 34.0522,
//     longitude: -118.2437,
//     headId: "head2",
//     createdAt: "2023-02-01T00:00:00Z",
//   },

//   {
//     id: "3",
//     name: "Vegan Vibes",
//     openTime: 8,
//     closeTime: 21,
//     status: "Open",
//     socialLinks: [
//       {
//         id: "4",
//         restaurantId: "3",
//         platformType: "Facebook",
//         url: "https://facebook.com/veganvibes",
//       },
//       {
//         id: "5",
//         restaurantId: "3",
//         platformType: "Instagram",
//         url: "https://instagram.com/veganvibes",
//       },
//     ],
//     phone: "555-555-5555",
//     images: [
//       "https://example.com/image5.jpg",
//       "https://example.com/image6.jpg",
//     ],
//     formattedAddress: "789 Oak St, Smalltown, USA",
//     latitude: 37.7749,
//     longitude: -122.4194,
//     headId: "head3",
//     createdAt: "2023-03-01T00:00:00Z",
//   },
// ];

export default function Restaurants() {
  const { data: user, isLoading, isError, error } = useAuth.useGetSession();

  const {
    data: restaurants,
    isLoading: restaurantsLoading,
    isError: restaurantsError,
  } = useRestaurants.useGetRestaurants(user?.id);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    const matchesSearch =
      restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.formattedAddress
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || restaurant.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Restaurants</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Restaurant
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="hover:cursor-pointer" value="all">
                All Status
              </SelectItem>
              <SelectItem className="hover:cursor-pointer" value="Open">
                Open
              </SelectItem>
              <SelectItem className="hover:cursor-pointer" value="Closed">
                Closed
              </SelectItem>
              <SelectItem
                className="hover:cursor-pointer"
                value="PermanentlyClosed"
              >
                PermanentlyClosed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants?.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">
            No restaurants found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
