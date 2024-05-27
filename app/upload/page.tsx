'use server';
import { createImage } from '../api/action';
import { getTags } from '../api/action';
import CreatableMultiselect from '../_components/CreatableMultiselect';

export default async function Page() {
  const tags = await getTags();
  console.log(tags);
  return (
    <main className="flex  max-w-full flex-col  items-center justify-center p-6 lg:p-24">
      <form action={createImage} className="form-control gap-4 w-full lg:w-1/2">
        <label className="input input-bordered flex items-center gap-2">
          A kép címe
          <input
            name="title"
            type="text"
            className="grow"
            placeholder="Mona Lisa"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Készítő neve
          <input
            name="name"
            type="text"
            className="grow"
            placeholder="Leonardo da Vinci"
          />
        </label>
        <CreatableMultiselect tags={tags} />
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button className="btn max-w-min" type="submit">
          Mentés
        </button>
      </form>
    </main>
  );
}
