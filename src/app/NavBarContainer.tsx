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
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-8 w-8 cursor-pointer"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                  onClick={goHome}
                />
              </div>

              <div className="hidden md:block">
                <div className="px-3 py-2 text-balance font-medium text-gray-300">
                  {currentScreenTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default NavBarContainer;
