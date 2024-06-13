import React from 'react';
import { adminFetchNumOfPages } from '../../api/action';
import Pagination from '../../_components/Pagination';
import ImagesTable from '../../_components/ImagesTable';
import AreYouSureModal from '../../_components/AreYouSureModal';
import { auth } from '@/app/api/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { page: number; open: boolean; id: number };
}) {
  const totalPages = await adminFetchNumOfPages();
  const currentPage = Number(searchParams?.page) || 1;
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <main className="flex flex-col items-center justify-between lg:p-24">
      <ImagesTable currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
      <AreYouSureModal searchParams={searchParams} />
    </main>
  );
}
