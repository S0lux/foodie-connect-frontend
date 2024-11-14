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
import RestaurantCard from "@/app/head/(management)/restaurants/_components/restaurant-card";
import useAuth from "@/hooks/use-auth";
import useRestaurants from "@/hooks/use-restaurants";
import Loader from "@/components/loader";

export default function Restaurants() {
  const { data: user, isLoading, isError } = useAuth.useGetSession();

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

  if (isLoading || restaurantsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || restaurantsError) {
    return <div>Error</div>;
  }

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
