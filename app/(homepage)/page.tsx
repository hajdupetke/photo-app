import { getUsers, getImages } from '../api/action';
import { Card } from '../_components/Card';

export default async function Home() {
  const images = await getImages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
        {images.map((image, index) => {
          return <Card key={index} image={image} />;
        })}
      </div>
    </main>
  );
}
