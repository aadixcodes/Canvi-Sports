import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

if (!process.env.CLOUDINARY_CLOUD_NAME && process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
} else {
  console.warn(
    'Cloudinary credentials are missing. File uploads will fail until CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are configured.'
  );
}

export default cloudinary;

