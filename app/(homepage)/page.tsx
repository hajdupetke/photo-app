import { fetchNumOfPages, getTags } from '../api/action';
import Pagination from '../_components/Pagination';
import Images from '../_components/Images';
import Menu from '../_components/Menu';

export default async function Home({
  searchParams,
}: {
  searchParams?: { page: number; tags: string; query: string };
}) {
  const totalPages = await fetchNumOfPages();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? null;

  const tagIds = searchParams?.tags
    ? searchParams?.tags.split(',').map((tag) => parseInt(tag))
    : null;

  const tags = await getTags();

  return (
    <>
      <Menu tags={tags} />
      <hr />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <main className="flex flex-col items-center justify-between lg:p-24">
          <Images currentPage={currentPage} tagIds={tagIds} query={query} />
          <Pagination totalPages={totalPages} />
        </main>
      </div>
    </>
  );
}
