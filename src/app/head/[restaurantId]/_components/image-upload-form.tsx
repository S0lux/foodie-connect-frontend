import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageUploadForm = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any[]>([]);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleImageChange = (event: any) => {
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
  };

  const handleSubmit = async (event: any) => {
    console.log("submitting");
  };

  return <div className="mx-auto w-full max-w-2xl p-4"></div>;
};

export default ImageUploadForm;
