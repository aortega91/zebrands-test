'use client';

import React, { useEffect, useState } from 'react';
import SearchInput from '@/src/app/search/SearchInput';
import GoBackButton from '@/src/app/search/GoBackButton';
import useDebounce from '@/src/utils/hooks/useDebouce';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/src/lib/hooks';
import { setSearchText } from '@/src/lib/features/search/searchSlice';
import { PRIMARY_COLOR } from '@/src/utils/constants';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const isSearchByUser = pathname === '/search/by-user';

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setSearchText(debouncedSearchTerm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const switchSearchType = () => {
    router.replace(isSearchByUser ? '/search/by-repository' : '/search/by-user');
  };

  return (
    <div className="flex flex-col h-full">
      <section
        className="flex mb-5 items-start flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 sm:items-center"
      >
        <GoBackButton />
        <SearchInput
          placeholder={isSearchByUser ? 'Buscar por usuario' : 'Buscar por repositorio'}
          onChange={updateSearchTerm}
        />
        <button
          type="button"
          style={{ color: PRIMARY_COLOR }}
          onClick={switchSearchType}
        >

          Cambiar a búsqueda por
          {' '}
          {isSearchByUser ? 'repositorio' : 'usuario'}
        </button>
      </section>
      <div
        className="flex h-full overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}
