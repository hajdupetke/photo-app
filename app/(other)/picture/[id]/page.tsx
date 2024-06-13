import { getImageById, getAllImageTags } from '@/app/api/action';

interface PicturePageProps {
  params: { id: string };
}

const PicturePage = async ({ params }: PicturePageProps) => {
  const image = await getImageById(parseInt(params.id));
  const tags = image ? await getAllImageTags(image) : null;

  if (image) {
    return (
      <div className="w-full lg:w-4/5  mx-auto mb-16">
        <div className="p-2 shadow-lg rounded bg-base-300 ">
          <img src={image.url} alt={image.title} />
        </div>
        <h1 className="text-golden mt-4 mb-1 text-2xl font-bold">
          {image.title}
        </h1>
        <p className="text-xl font-bold">{image.name}</p>
        <p>{image.year}</p>
        {tags?.map((tag) => {
          return (
            <div className="badge badge-neutral mr-2" key={tag.id}>
              {tag.name}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <h1 className="text-4xl text-center font-bold">A kép nem található</h1>
    );
  }
};

export default PicturePage;
