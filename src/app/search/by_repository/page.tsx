'use client';

import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/lib/hooks';
import { SCREEN_TITLES } from '@/src/utils/constants';

export default function RepositorySearch() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.REPOSITORY_SEARCH));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <title>{SCREEN_TITLES.REPOSITORY_SEARCH}</title>
      <p>
        Search by project page
      </p>
    </main>
  );
}
