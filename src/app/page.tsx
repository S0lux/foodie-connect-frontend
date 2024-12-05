import Header from "@/components/header";
import Map from "@/components/map";
import DishRecommendationCarousel from "@/components/dish-recommend-carousel";
import RestaurantGrid from "@/components/restaurant-grid";
import "dotenv/config";
import RestaurantRecommendationCarousel from "@/components/restaurant-recomend-carousel";

export default async function Home() {
  return (
    <>
      <Header />
      <div className="mt-[--header-height] w-full px-10 xl:px-40">
        <div className="w-full flex-col justify-center space-y-10 py-10">
          <Map />
          <DishRecommendationCarousel />
          <RestaurantRecommendationCarousel />
          <RestaurantGrid />
        </div>
      </div>
    </>
  );
}
