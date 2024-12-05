import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRestaurants from "@/hooks/use-restaurants";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";

interface ImageUploadFormProps {
  onSuccess?: () => void;
}

const ImageUploadForm = ({ onSuccess }: ImageUploadFormProps) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any[]>([]);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const uploadImage = useRestaurants.useUploadRestaurantImage();

  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: any) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const displayFiles = files.map((file) => URL.createObjectURL(file as Blob));
    setDisplayImages((prevDisplayImages: string[]) => [
      ...prevDisplayImages,
      ...displayFiles,
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setDisplayImages((prevDisplayImages: string[]) =>
      prevDisplayImages.filter((_, i) => i !== index),
    );

    // Reset input value to allow selecting the same file again
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // Filter for image files only
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setImages((prevImages) => [...prevImages, ...imageFiles]);
    const displayFiles = imageFiles.map((file) => URL.createObjectURL(file));
    setDisplayImages((prevDisplayImages) => [
      ...prevDisplayImages,
      ...displayFiles,
    ]);
  };

  async function handleSubmit(event: any) {
    console.log(images);
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setLoadingImage(true);

    try {
      await uploadImage.mutateAsync({ restaurantId, images });

      // Clear form after successful upload
      setImages([]);
      setDisplayImages([]);
      if (inputFile.current) {
        inputFile.current.value = "";
      }
      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    } finally {
      setLoadingImage(false);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="images">Upload Images</Label>
            <div
              className="rounded-lg flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400"
              onClick={() => inputFile.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="mb-2 h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <Input
                id="images"
                type="file"
                ref={inputFile}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
            </div>
          </div>

          {displayImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {displayImages.map((image, index) => (
                <div key={index} className="group relative">
                  <div className="rounded-lg aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={images.length === 0 || loadingImage}
          >
            {loadingImage ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>
                  Upload {images.length}{" "}
                  {images.length === 1 ? "Image" : "Images"}
                </span>
              </div>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ImageUploadForm;
