import Image from 'next/image';
import { getUsers, getImages } from './api/action';
import { UploadButton } from './utils/uploadthing';

export default async function Home() {
  const images = await getImages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {images.map((image, index) => {
        return <span key={index}>{image.url}</span>;
      })}
    </main>
  );
}
