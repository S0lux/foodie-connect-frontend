import { Cloudinary } from "@cloudinary/url-gen";

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export default cld;
