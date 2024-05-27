'use server';

import Link from 'next/link';
import { getTags } from '../api/action';
import Multiselect from './Multiselect';

const Menu = async () => {
  const tags = await getTags();

  return (
    <div className="w-full flex-row justify-center flex gap-1 mt-7">
      <form className="flex flex-row justify-center gap-1 flex-wrap">
        <div className="flex gap-2 flex-wrap md:flex-nowrap justify-center px-10">
          <Multiselect tags={tags} />
          <label className="basis-1 md:basis-1/2 input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Keresés" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-neutral text-lg">
            Szűrés
          </button>

          <Link
            href="/upload"
            className="btn btn-secondary border-0 text-lg text-white  bg-golden hover:bg-golden"
          >
            Feltöltés
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Menu;
