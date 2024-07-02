/* eslint-disable no-restricted-globals */

'use client';

import { useEffect } from 'react';
import { setScreenTitle } from '@/src/lib/features/navigation/navigationSlice';
import { PRIMARY_COLOR, SCREEN_TITLES } from '@/src/utils/constants';
import { useAppDispatch } from '@/src/lib/hooks';
import Image from 'next/image';
import useWindowSize from '@/src/utils/hooks/useWindowSize';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScreenTitle(SCREEN_TITLES.HOME));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { height, width } = useWindowSize();

  return (
    <div className="h-full">
      <title>{SCREEN_TITLES.HOME}</title>
      <div
        className="h-full flex flex-col gap-8 text-black justify-center items-center"
      >
        <Image
          className="rounded-full flex w-1/2 h-1/2"
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          alt="home image"
          width={(width || 100) / 2}
          height={(height || 100) / 2}
        />

        <p className="text-4xl text-center">Buscador GitHub</p>

        <div
          className="flex flex-col gap-4 items-center w-2/3 sm:w-1/3"
        >
          <a
            href="/search/by-user"
            style={{ color: 'white', backgroundColor: PRIMARY_COLOR }}
            className="rounded-md text-center shadow p-4 mb-4 w-full"
          >
            Buscar por usuario
          </a>
          <a
            href="/search/by-repository"
            style={{ color: 'white', backgroundColor: PRIMARY_COLOR }}
            className="rounded-md text-center shadow p-4 mb-4 w-full"
          >
            Buscar por repositorio
          </a>
        </div>

      </div>
    </div>
  );
}
