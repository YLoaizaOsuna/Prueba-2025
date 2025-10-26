/* eslint-disable @typescript-eslint/no-unsafe-return */
import { v2 as cloudinary } from 'cloudinary';
import { environment } from './environment.dev';

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return cloudinary.config({
      cloud_name: environment.CLOUDINARY_CLOUD_NAME,
      api_key: environment.CLOUDINARY_API_KEY,
      api_secret: environment.CLOUDINARY_API_SECRET,
    });
  },
};
