import Header from "@/components/header";
import RestaurantCard from "@/components/restaurant-card";
import RestaurantGrid from "@/components/restaurant-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-[--header-height] w-full">
        <div className="py-5">
          <RestaurantGrid restaurants={mockData}></RestaurantGrid>
        </div>
      </div>
    </>
  );
}

const mockData = [
  {
    name: "Example restaurant 1",
    category: "Foods",
  },
  {
    name: "Example restaurant 2",
    category: "Foods",
  },
  {
    name: "Example restaurant 3",
    category: "Foods",
  },
  {
    name: "Example restaurant 4",
    category: "Foods",
  },

  {
    name: "Example restaurant 1",
    category: "Drinks",
  },
  {
    name: "Example restaurant 2",
    category: "Drinks",
  },

  {
    name: "Example restaurant 3",
    category: "Drinks",
  },
  {
    name: "Example restaurant 4",
    category: "Drinks",
  },

  {
    name: "Example restaurant 1",
    category: "Bistro",
  },
  {
    name: "Example restaurant 2",
    category: "Bistro",
  },
  {
    name: "Example restaurant 3",
    category: "Bistro",
  },
];
