'use client';

import { redirect } from 'next/navigation';
import { UploadButton } from '../utils/uploadthing';
import { createImage } from '../api/action';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createImage} className="form-control">
        <input
          type="text"
          name="title"
          className="input input-bordered flex items-center gap-2"
        />
        <input type="file" name="image" />
        <button className="btn" type="submit">
          Mentés
        </button>
      </form>
    </main>
  );
}
