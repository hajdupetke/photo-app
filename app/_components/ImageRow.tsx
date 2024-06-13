'use client';

import { Image } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ImageRow = ({ image }: { image: Image }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('open', 'true');
    params.set('id', id.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <tr className="hover">
      <th>{image.id}</th>
      <td>{image.title}</td>
      <td>{image.name}</td>
      <td>
        <div className="flex gap-2 justify-end">
          <Link className="btn btn-primary" href={`/admin/edit/${image.id}`}>
            Módosítás
          </Link>
          <Link className="btn btn-error" href={createPageURL(image.id)}>
            Törlés
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ImageRow;
