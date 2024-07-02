'use client';

import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/lib/hooks';
import { SCREEN_TITLES, SEARCH_TYPES } from '@/src/utils/constants';
import SearchResultsContainer from '@/src/app/components/SearchResultsContainer';
import { useSearchData } from '@/src/lib/features/search/searchSlice';
import useSearch from '@/src/app/search/api/useSearch';
import RepositoryCard, { TRepository } from '@/src/app/components/RepositoryCard';

export default function RepositorySearch() {
  const dispatch = useAppDispatch();
  const { searchText } = useSearchData();

  const {
    isLoading,
    searchResultItems,
    totalItems,
    currentPage,
    totalPages,
    selectPage,
    getNextPage,
    getPreviousPage,
    refreshSearch,
  } = useSearch(searchText, SEARCH_TYPES.REPOSITORY);

  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.REPOSITORY_SEARCH));
    refreshSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center flex-1 h-full">
      <title>{SCREEN_TITLES.REPOSITORY_SEARCH}</title>

      <SearchResultsContainer
        items={searchResultItems}
        totalItems={totalItems}
        page={currentPage}
        isLoading={isLoading}
        totalPages={totalPages}
        onSelectedPage={selectPage}
        onNextPage={getNextPage}
        onPreviousPage={getPreviousPage}
        renderItem={(item) => (
          <RepositoryCard
            key={(item as TRepository).id}
            repository={item as TRepository}
          />
        )}
      />
    </div>
  );
}
