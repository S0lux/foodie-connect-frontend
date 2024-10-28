import { mockData } from "@/app/page";
import FoodGrid from "@/components/food-grid";
import { RestaurantDto } from "@/components/restaurant-grid";
import { ReviewGrid } from "@/components/review-grid";

export type DishDto = {
  name: string;
  price: number;
};

export type ReviewDto = {
  content: string;
  rating: number;
  postedDate: Date;
};

const RestauranDetailPage = ({ params }: { params: { id: string } }) => {
  const restaurant: RestaurantDto | undefined = mockData.find(
    (restaurant: RestaurantDto) => {
      return restaurant.id === params.id;
    },
  );
  return (
    <div className="flex flex-col space-y-5">
      {/* menu */}
      <FoodGrid dishList={mockFood}></FoodGrid>

      {/* Reviews */}
      <ReviewGrid reviews={mockReview}></ReviewGrid>
    </div>
  );
};

export default RestauranDetailPage;

const mockReview: ReviewDto[] = [
  {
    content: "This is exceedingly good",
    rating: 10,
    postedDate: new Date(),
  },
  {
    content: "Tastes good",
    rating: 9,
    postedDate: new Date(),
  },
  {
    content: "Ill give it a 8/10",
    rating: 8,
    postedDate: new Date(),
  },
  {
    content: "Good for its price",
    rating: 7,
    postedDate: new Date(),
  },
  {
    content: "Not what I expected but acceptable",
    rating: 6,
    postedDate: new Date(),
  },
  {
    content: "Eh, its averge",
    rating: 5,
    postedDate: new Date(),
  },
  {
    content: "Averge, a little dissapointed to be honest",
    rating: 4,
    postedDate: new Date(),
  },
  {
    content: "Bad, the service was could use some improvement",
    rating: 3,
    postedDate: new Date(),
  },
  {
    content: "Food was cold, not good at all",
    rating: 2,
    postedDate: new Date(),
  },
  {
    content: "Bad, do not recommend",
    rating: 1,
    postedDate: new Date(),
  },
];

const mockFood: DishDto[] = [
  {
    name: "Dish 1",
    price: 10000,
  },
  {
    name: "Dish 2",
    price: 10000,
  },
  {
    name: "Dish 3",
    price: 10000,
  },
  {
    name: "Dish 4",
    price: 10000,
  },
  {
    name: "Dish 5",
    price: 10000,
  },
  {
    name: "Dish 6",
    price: 10000,
  },
  {
    name: "Dish 7",
    price: 10000,
  },
  {
    name: "Dish 8",
    price: 10000,
  },
  {
    name: "Dish 9",
    price: 10000,
  },
  {
    name: "Dish 10",
    price: 10000,
  },
];
