'use server';
import { createImage } from '../api/action';
import { getTags } from '../api/action';
import CreatableMultiselect from '../_components/CreatableMultiselect';

export default async function Page() {
  const tags = await getTags();
  console.log(tags);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createImage} className="form-control">
        <input
          type="text"
          name="title"
          className="input input-bordered flex items-center gap-2"
        />
        <input
          type="text"
          name="name"
          className="input input-bordered flex items-center gap-2"
        />
        <CreatableMultiselect tags={tags} />
        <input type="file" name="image" />
        <button className="btn" type="submit">
          Mentés
        </button>
      </form>
    </main>
  );
}
