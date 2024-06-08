import { fetchNumOfPages } from '../api/action';
import Pagination from '../_components/Pagination';
import Images from '../_components/Images';

export default async function Home({
  searchParams,
}: {
  searchParams?: { page: number };
}) {
  const totalPages = await fetchNumOfPages();
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24">
      <Images currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
