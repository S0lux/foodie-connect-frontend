"use client";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { DebounceInput } from "react-debounce-input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useDishes from "@/hooks/use-dishes";
import Link from "next/link";
import { Dish } from "@/types/dishes.type";
import http from "@/lib/http";
import { Restaurant } from "@/types/restaurant.type";
import { useUserLocation } from "@/hooks/use-location";
import { UtensilsCrossed } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState({ name: "" });
  const [dishResults, setDishResults] = useState<Dish[]>([]);
  const [restaurantResults, setRestaurantResults] = useState<Restaurant[]>([]);
  const { locationString } = useUserLocation();

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ name: e.target.value });
    if (e.target.value.length > 0) {
      const dishes = await http
        .get<Dish[]>("v1/dishes", { params: { name: e.target.value } })
        .then((res) => res.data);
      const restaurants = await http
        .get<
          Restaurant[]
        >("v1/restaurants", { params: { name: e.target.value, origin: locationString, radius: 1650000 } })
        .then((res) => res.data);
      setDishResults(dishes);
      setRestaurantResults(restaurants);
    } else {
      setDishResults([]);
      setRestaurantResults([]);
    }
  };
  return (
    <Command className="relative shadow-sm dark:bg-card">
      <div className="flex items-center gap-2 bg-transparent px-3 py-1.5">
        <MagnifyingGlassIcon className="size-5 opacity-50" />
        <DebounceInput
          debounceTimeout={300}
          onChange={onSearch}
          className="w-full bg-transparent outline-none"
          placeholder="Search for dishes or restaurants..."
        />
      </div>

      {query.name.length > 0 && (
        <CommandList className="border-t border-foreground/50">
          {dishResults.length === 0 &&
            restaurantResults.length === 0 &&
            query.name.length > 0 && (
              <CommandEmpty>
                <div className="flex-col items-center justify-center opacity-50">
                  <UtensilsCrossed className="w-full"></UtensilsCrossed>
                  <span>No results found.</span>
                </div>
              </CommandEmpty>
            )}
          {dishResults.length > 0 && (
            <>
              <CommandGroup heading="Dishes">
                {dishResults?.map((dish) => {
                  return (
                    <Link href={`/dishes/${dish.dishId}`}>
                      <CommandItem key={dish.dishId}>{dish.name}</CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
              <CommandSeparator className="opacity-50" />
            </>
          )}

          {restaurantResults.length > 0 && (
            <CommandGroup heading="Restaurants">
              {restaurantResults?.map((restaurant) => {
                return (
                  <Link href={`/restaurant-detail/${restaurant.id}`}>
                    <CommandItem key={restaurant.id}>
                      {restaurant.name}
                    </CommandItem>
                  </Link>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
