import { Image } from '@prisma/client';
import { getImageTags } from '../api/action';

interface CardProps {
  image: Image;
}
export const Card = async ({ image }: CardProps) => {
  const tags = await getImageTags(image);

  return (
    <div className="card card-compact w-full lg:w-96 bg-base-300 shadow-xl h-full">
      <div className="p-4 w-full h-3/4">
        <img
          src={image.url}
          alt={image.title}
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="card-body">
        <div>
          <h2 className="card-title text-golden mb-0 text-2xl">
            {image.title}
          </h2>
          <p className="text-lg">{image.name}</p>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => {
            return (
              <div className="badge badge-neutral" key={tag.id}>
                {tag.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
