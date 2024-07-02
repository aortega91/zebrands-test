'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useNavigationData } from '@/src/lib/features/navigation/navigationSlice';

function NavBarContainer({ children }: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentScreenTitle } = useNavigationData();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="bg-gray-800">
        <div className="max-w-7xl px-2 sm:px-4 lg:px-6">
          <div className="flex h-16 p-4 items-center justify-between">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 w-8 cursor-pointer"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                onClick={goHome}
              />
            </div>

            <div
              className="flex flex-1 justify-center sm:justify-start"
            >
              <div
                className="px-3 py-2 text-balance font-medium text-gray-300"
              >
                {currentScreenTitle}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        style={{
          height: 'calc(100% -  4rem)',
        }}
        className="bg-gray-200  py-6 px-6 sm:px-8 lg:px-10"
      >
        {children}
      </div>
    </div>
  );
}

export default NavBarContainer;
