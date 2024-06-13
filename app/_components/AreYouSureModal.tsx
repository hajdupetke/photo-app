'use server';

import Link from 'next/link';
import { deleteImage } from '../api/action';
import { redirect } from 'next/navigation';

const AreYouSureModal = async ({
  searchParams,
}: {
  searchParams?: { page: number; open: boolean; id: number };
}) => {
  console.log(searchParams?.open);

  const handleClose = () => {
    if (searchParams?.page) {
      return `/admin?page=${searchParams?.page}`;
    } else {
      return '/admin';
    }
  };

  return (
    <dialog open={Boolean(searchParams?.open)} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Törlés!</h3>
        <p className="py-4">Biztos kiakarod törölni?</p>
        <div className="modal-action">
          <form
            action={async () => {
              'use server';
              if (searchParams) await deleteImage(searchParams);
            }}
            className="flex gap-2"
          >
            {/* if there is a button in form, it will close the modal */}
            <Link className="btn" href={handleClose()}>
              Mégse
            </Link>
            <button className="btn btn-error" type="submit">
              Biztos!
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AreYouSureModal;
