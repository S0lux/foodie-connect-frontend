import Header from "@/components/header";
import RestaurantGrid, { RestaurantDto } from "@/components/restaurant-grid";
import "dotenv/config";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-[--header-height] w-full px-10 xl:px-40">
        <div className="py-5">
          <RestaurantGrid restaurants={mockData}></RestaurantGrid>
        </div>
      </div>
    </>
  );
}

export const mockData: RestaurantDto[] = [
  {
    id: "res1",
    name: "Example restaurant 1",
    category: "Foods",
  },
  {
    id: "res2",
    name: "Example restaurant 2",
    category: "Foods",
  },
  {
    id: "res3",
    name: "Example restaurant 3",
    category: "Foods",
  },
  {
    id: "res4",
    name: "Example restaurant 4",
    category: "Foods",
  },

  {
    id: "res5",
    name: "Example restaurant 1",
    category: "Drinks",
  },
  {
    id: "res6",
    name: "Example restaurant 2",
    category: "Drinks",
  },

  {
    id: "res7",
    name: "Example restaurant 3",
    category: "Drinks",
  },
  {
    id: "res8",
    name: "Example restaurant 4",
    category: "Drinks",
  },

  {
    id: "res9",
    name: "Example restaurant 1",
    category: "Bistro",
  },
  {
    id: "res10",
    name: "Example restaurant 2",
    category: "Bistro",
  },
  {
    id: "res11",
    name: "Example restaurant 3",
    category: "Bistro",
  },
];
