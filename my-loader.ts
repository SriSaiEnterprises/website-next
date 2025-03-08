// my-loader.ts
import { ImageLoader } from 'next/image';

const customLoader: ImageLoader = ({ src, width, quality }) => {
  // Add your custom logic here to handle image URLs
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default customLoader;