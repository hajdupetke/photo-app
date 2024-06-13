import React from 'react';
import { adminGetImages } from '../api/action';
import ImageRow from './ImageRow';

const ImagesTable = async ({ currentPage }: { currentPage: number }) => {
  const images = await adminGetImages(currentPage);

  return (
    <>
      <table className="table mb-4">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Kép címe</th>
            <th>Készítő</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <ImageRow image={image} key={image.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ImagesTable;
