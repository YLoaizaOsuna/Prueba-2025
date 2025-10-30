import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

// __dirname = .../src/config en tiempo de desarrollo
dotenvConfig({
  path: resolve(__dirname, '..', '..', '.env.development'),
});

export const environment = {
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  JWT_SECRET: process.env.JWT_SECRET,
};
