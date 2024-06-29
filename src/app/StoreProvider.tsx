'use client';

import { useRef, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { makeStore } from '@/src/lib/store';

export default function StoreProvider({ children }: { children: ReactElement }) {
  const storeRef = useRef<EnhancedStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
