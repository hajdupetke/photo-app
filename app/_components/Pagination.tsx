'use client';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="join">
        <PaginationArrow
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        >
          «
        </PaginationArrow>
        <button className="join-item btn">
          Page {currentPage}/{totalPages}
        </button>
        <PaginationArrow
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        >
          »
        </PaginationArrow>
      </div>
    </>
  );
};

export default Pagination;

const PaginationArrow = ({
  href,
  isDisabled,
  children,
}: {
  href: string;
  isDisabled: boolean;
  children: React.ReactNode;
}) => {
  return isDisabled ? (
    <div className="join-item btn btn-disabled">{children}</div>
  ) : (
    <Link className="join-item btn" href={href}>
      {children}
    </Link>
  );
};
