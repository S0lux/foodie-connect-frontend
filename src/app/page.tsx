import Header from "@/components/header";
import Map from "@/components/map";
import RecommendationCarousel from "@/components/recommend-carousel";
import RestaurantGrid from "@/components/restaurant-grid";
import "dotenv/config";

export default async function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-[--header-height] w-full px-10 xl:px-40">
        <div className="w-full flex-col justify-center space-y-10 py-10">
          <Map></Map>
          <RecommendationCarousel></RecommendationCarousel>
          <RestaurantGrid></RestaurantGrid>
        </div>
      </div>
    </>
  );
}
