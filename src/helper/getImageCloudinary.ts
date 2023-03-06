import { Cloudinary } from "@cloudinary/url-gen";

export default function getImageFromCloudinary() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    },
  });

  return cld;
}
