'use server';
import {
  updateImage,
  getImageById,
  getTags,
  getAllImageTags,
} from '@/app/api/action';
import CreatableMultiselect from '@/app/_components/CreatableMultiselect';
import SubmitButton from '@/app/_components/SubmitButton';

export default async function Page({ params }: { params: { id: string } }) {
  const tags = await getTags();
  const image = await getImageById(parseInt(params.id));
  const imageTags = image ? await getAllImageTags(image) : null;

  const updateImageWithId = updateImage.bind(null, params.id);

  return (
    <main className="flex  max-w-full flex-col  items-center justify-center p-6 lg:p-24">
      <form
        action={updateImageWithId}
        className="form-control gap-4 w-full lg:w-1/2"
      >
        <label className="input input-bordered flex items-center gap-2">
          A kép címe
          <input
            name="title"
            type="text"
            className="grow"
            placeholder="Mona Lisa"
            defaultValue={image?.title ?? undefined}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Készítő neve
          <input
            name="name"
            type="text"
            className="grow"
            placeholder="Leonardo da Vinci"
            defaultValue={image?.name ?? undefined}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Készítés éve
          <input
            name="year"
            type="number"
            className="grow"
            min={1826}
            max={new Date().getFullYear()}
            placeholder="2024"
            defaultValue={image?.year ?? undefined}
          />
        </label>

        <CreatableMultiselect tags={tags} selectedTags={imageTags} />
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <SubmitButton />
      </form>
    </main>
  );
}
