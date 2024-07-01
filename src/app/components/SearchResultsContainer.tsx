/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PageButton from '@/src/app/components/PageButton';
import { TUser } from '@/src/app/components/UserCard';

type TSearchResultsContainerProps = {
  items: any[];
  page: number;
  totalPages: number;
  totalItems: number;
  // eslint-disable-next-line no-unused-vars
  onSelectedPage: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;

  // eslint-disable-next-line no-unused-vars
  renderItem: (item: TUser) => React.ReactNode;
}

const INITIAL_LEFT_SIDE_PAGES = [1, 2, 3];

export default function SearchResultsContainer({
  items, page, totalPages, totalItems,
  onSelectedPage,
  onNextPage, onPreviousPage, renderItem,
}: TSearchResultsContainerProps) {
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const hasFewPages = totalPages > 0 && totalPages <= 10;

  const itemsOnPage = items.length;

  const [leftSidePages, setLeftSidePages] = useState(INITIAL_LEFT_SIDE_PAGES);

  useEffect(() => {
    if (leftSidePages.includes(page)) {
      if (page >= 3 || page === 2) {
        setLeftSidePages([page - 1, page, page + 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderPageButtons = () => {
    if (hasFewPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <PageButton
          key={pageNumber}
          page={pageNumber}
          isSelected={page === pageNumber}
          onSelect={onSelectedPage}
        />
      ));
    }

    const rightSidePages = [totalPages - 2, totalPages - 1, totalPages];

    const parsedPages = [...leftSidePages, 'ellipsis', ...rightSidePages];

    return parsedPages.map((pageItem) => {
      if (pageItem === 'ellipsis') {
        return (
          <span
            key={pageItem}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }

      return (
        <PageButton
          key={pageItem}
          page={pageItem as number}
          isSelected={page === pageItem}
          onSelect={onSelectedPage}
        />
      );
    });
  };

  const itemsStart = page === 1 ? 1 : (((page - 1) * 10) + 1);
  const itemsEnd = page === 1 ? itemsOnPage : (itemsStart + itemsOnPage - 1);

  return (
    <div
      className="flex flex-col w-full lg:w-4/5"
    >

      <div
        className="flex h-full flex-col p-4 mb-4 overflow-auto"
      >
        {
          (items) && items.map((item) => renderItem(item))
        }
      </div>

      {/* <div
        style={{
          border: '1px solid red',
        }}
        className="flex flex-col"
      >
        {
          (items) && items.map((item) => renderItem(item))
        }
      </div> */}

      <div className="rounded-lg shadow flex h-16 items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">

        <div className="flex flex-1 justify-between sm:hidden">
          {hasPreviousPage && (
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onPreviousPage}
          >
            Anterior
          </a>
          )}
          <div className="flex flex-1" />
          {hasNextPage && (
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onNextPage}
          >
            Siguiente
          </a>
          )}
        </div>
        <div className="hidden  sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="space-x-0.5">
            <p className="text-sm text-gray-700">
              Mostrando
              <span className="font-medium mx-1">{itemsStart}</span>
              -
              <span className="font-medium mx-1">{itemsEnd}</span>
              de
              <span className="font-medium mx-1">{totalItems}</span>
              resultados
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {hasPreviousPage && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={onPreviousPage}
              >
                <span className="sr-only">Anterior</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              )}

              {renderPageButtons()}

              {hasNextPage && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={onNextPage}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              )}
            </nav>
          </div>
        </div>

      </div>
    </div>

  );
}
