'use client';

import { useEffect } from 'react';
import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { SCREEN_TITLES } from '@/src/utils/constants';
import { useAppDispatch } from '@/src/lib/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.HOME));
  }, []);

  return (
    <div className="min-h-full">
      <title>{SCREEN_TITLES.HOME}</title>
      <p>THIS IS THE INITIAL SCREEN</p>
    </div>
  );
}
