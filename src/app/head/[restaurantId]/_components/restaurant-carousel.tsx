import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImageById } from "@/lib/handleImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Trash } from "lucide-react";
import ImageUploadForm from "@/app/head/[restaurantId]/_components/image-upload-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useRestaurants from "@/hooks/use-restaurants";

interface RestaurantCarouselProps {
  refetch: () => void;
  images?: string[];
  onDeleteImage?: (imageId: string) => Promise<void>;
}

const RestaurantCarousel: React.FC<RestaurantCarouselProps> = ({
  refetch,
  images = [],
  onDeleteImage,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteImage = async (imageId: string) => {
    if (loading) return;
    setLoading(true);
    if (onDeleteImage) {
      try {
        await onDeleteImage(imageId);
        refetch();
      } catch (error) {
        console.error("Error deleting image:", error);
      } finally {
        setLoading(false);
      }
    }
    setImageToDelete(null);
  };

  const EmptyState = () => (
    <Card className="w-full p-4 sm:p-6">
      <div className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">Images</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Add New Image
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg max-h-[90vh] max-w-[95vw] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-center">Add New Image</DialogTitle>
                <DialogDescription className="text-center">
                  Add new image to your restaurant
                </DialogDescription>
              </DialogHeader>
              <ImageUploadForm
                onSuccess={() => {
                  setIsDialogOpen(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    </Card>
  );

  if (!images || images.length === 0) return <EmptyState />;

  return (
    <>
      <Card className="w-full p-4 sm:p-6">
        <div className="w-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">Images</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full sm:w-auto"
                  variant="secondary"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add New Image
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-lg max-h-[90vh] max-w-[95vw] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Add New Image
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Add new image to your restaurant
                  </DialogDescription>
                </DialogHeader>
                <ImageUploadForm
                  onSuccess={() => {
                    setIsDialogOpen(false);
                    refetch();
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-4xl"
            >
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem
                    key={image}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="aspect-video p-0">
                          <div className="group relative h-full w-full">
                            <img
                              src={getImageById(image)}
                              alt="restaurant"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute right-2 top-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                                  >
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="text-destructive hover:cursor-pointer focus:text-destructive"
                                    onClick={() => setImageToDelete(image)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="bg-black bg-opacity-50 text-white transition-all hover:bg-opacity-70" />
                <CarouselNext className="bg-black bg-opacity-50 text-white transition-all hover:bg-opacity-70" />
              </div>
            </Carousel>
          </div>
        </div>
      </Card>

      <AlertDialog
        open={!!imageToDelete}
        onOpenChange={() => setImageToDelete(null)}
      >
        <AlertDialogContent className="rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => imageToDelete && handleDeleteImage(imageToDelete)}
              disabled={loading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RestaurantCarousel;
