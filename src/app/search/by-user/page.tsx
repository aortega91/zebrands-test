'use client';

import { useAppDispatch } from '@/src/lib/hooks';
import { useEffect } from 'react';
import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { SCREEN_TITLES, SEARCH_TYPES } from '@/src/utils/constants';
import useSearch from '@/src/app/search/api/useSearch';
import { useSearchData } from '@/src/lib/features/search/searchSlice';
import SearchResultsContainer from '@/src/app/components/SearchResultsContainer';
import UserCard from '@/src/app/components/UserCard';

export default function UserSearch() {
  const dispatch = useAppDispatch();
  const { searchText } = useSearchData();

  const {
    /*    isLoading,
    isError, */
    searchResultItems,
    totalItems,
    currentPage,
    totalPages,
    selectPage,
    getNextPage,
    getPreviousPage,
    refreshSearch,
  } = useSearch(searchText, SEARCH_TYPES.USER);

  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.USER_SEARCH));
    refreshSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex justify-center flex-1 h-full"
    >
      <title>{SCREEN_TITLES.USER_SEARCH}</title>

      <SearchResultsContainer
        items={searchResultItems}
        totalItems={totalItems}
        page={currentPage}
        totalPages={totalPages}
        onSelectedPage={selectPage}
        onNextPage={getNextPage}
        onPreviousPage={getPreviousPage}
        renderItem={(item) => <UserCard user={item} />}
      />

    </div>
  );
}
