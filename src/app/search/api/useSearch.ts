import { GITHUB_API_BASE_URL, InputSearchType } from '@/src/utils/constants';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 10;

export default function useSearch(queryText: string, searchType: InputSearchType) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalItems, setTotalElements] = useState(0);

  const [searchResultItems, setSearchResultItems] = useState<Array<Object>>([]);

  useEffect(() => {
    if (totalItems > 0) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [totalItems]);

  const setSearchData = (queryResponse: { items: Array<Object>, total_count: number }) => {
    // eslint-disable-next-line camelcase
    const { items, total_count } = queryResponse;

    setTotalElements(total_count);
    setSearchResultItems(items);
  };

  const onQueryError = () => { setIsError(true); };

  const onQueryFinish = () => { setIsLoading(false); };

  const searchQuery = () => {
    fetch(
      `${GITHUB_API_BASE_URL}search/${searchType}?q=${encodeURIComponent(queryText)}&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .catch(() => {
      })
      .then(setSearchData)
      .catch(onQueryError)
      .finally(onQueryFinish);
  };

  const selectPage = (page: number) => {
    setCurrentPage(page);
  };

  const getNextPage = () => {
    if (currentPage < totalPages && totalPages > 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPreviousPage = () => {
    if (currentPage > 1 && totalPages > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const refreshSearch = () => {
    if (queryText !== '') {
      searchQuery();
    }
  };

  useEffect(() => {
    refreshSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText, searchType, currentPage]);

  return {
    isLoading,
    isError,
    searchResultItems,
    totalItems,
    currentPage,
    totalPages,
    selectPage,
    getNextPage,
    getPreviousPage,
    refreshSearch,
  };
}
