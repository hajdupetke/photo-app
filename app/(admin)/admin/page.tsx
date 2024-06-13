import React from 'react';
import { adminFetchNumOfPages } from '../../api/action';
import Pagination from '../../_components/Pagination';
import ImagesTable from '../../_components/ImagesTable';
import AreYouSureModal from '../../_components/AreYouSureModal';

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { page: number; open: boolean; id: number };
}) {
  const totalPages = await adminFetchNumOfPages();
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex flex-col items-center justify-between lg:p-24">
      <ImagesTable currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
      <AreYouSureModal searchParams={searchParams} />
    </main>
  );
}
