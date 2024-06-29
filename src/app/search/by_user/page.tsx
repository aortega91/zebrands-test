'use client';

import { useAppDispatch } from '@/src/lib/hooks';
import { useEffect } from 'react';
import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { SCREEN_TITLES } from '@/src/utils/constants';

export default function UserSearch() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.USER_SEARCH));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <title>{SCREEN_TITLES.USER_SEARCH}</title>
      <div>
        <p>
          Search by user page
        </p>
      </div>
    </main>
  );
}
