import { getUsers, getImages } from './api/action';
import { Card } from './_components/Card';

export default async function Home() {
  const images = await getImages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => {
          return <Card key={index} image={image} />;
        })}
      </div>
    </main>
  );
}
