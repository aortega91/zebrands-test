/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PageButton from '@/src/app/components/PageButton';
import { TUser } from '@/src/app/components/UserCard';
import { PRIMARY_COLOR } from '@/src/utils/constants';

type TSearchResultsContainerProps = {
  items: any[];
  page: number;
  isLoading: boolean;
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
  items, page, isLoading, totalPages, totalItems,
  onSelectedPage,
  onNextPage, onPreviousPage, renderItem,
}: TSearchResultsContainerProps) {
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const hasFewPages = totalPages > 0 && totalPages <= 10;

  const itemsOnPage = items.length;

  const [leftSidePages, setLeftSidePages] = useState(INITIAL_LEFT_SIDE_PAGES);

  const [searchWasPerformed, setSearchWasPerformed] = useState(false);

  useEffect(() => () => {
    if (!searchWasPerformed && isLoading) {
      setSearchWasPerformed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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

      {(!isLoading && items.length === 0) && (
        <div
          className="h-full flex items-center justify-center text-gray-500"
        >
          <p className="text-3xl">
            {!searchWasPerformed
              ? 'Realiza una búsqueda para ver los resultados'
              : 'No se encontraron resultados para la búsqueda'}
          </p>
        </div>
      )}

      {isLoading && (
      <div
        role="status"
        className="h-full flex items-center justify-center"
      >
        <svg
          aria-hidden="true"
          className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill={PRIMARY_COLOR}
          />
        </svg>
      </div>
      )}

      {(!isLoading && items.length > 0) && (
      <>
        <div
          className="flex h-full flex-col p-4 mb-4 overflow-auto"
        >
          {
            (items) && items.map((item) => renderItem(item))
          }
        </div>

        {(items && items.length > 0) && (
        <div
          className="rounded-lg shadow flex h-16 items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6"
        >

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
        )}
      </>
      )}
    </div>

  );
}
