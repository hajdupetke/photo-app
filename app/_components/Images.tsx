import { Card } from '../_components/Card';
import Link from 'next/link';
import { getImages } from '../api/action';
import Pagination from './Pagination';

const Images = async ({
  currentPage,
  tagIds,
  query,
}: {
  currentPage: number;
  tagIds: number[] | null;
  query: string | null;
}) => {
  const images = await getImages(currentPage, tagIds, query);

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20 mb-12">
        {images.map((image) => {
          return (
            <Link href={`/picture/${image.id}`} key={image.id}>
              <Card image={image} />
            </Link>
          );
        })}
      </div>
      {images.length <= 0 && (
        <div className="text-center text-2xl font-bold my-10">
          Nincsen a keresésnek megfelelő kép.
        </div>
      )}
    </>
  );
};

export default Images;
