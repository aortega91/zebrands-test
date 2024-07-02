import { Store } from '@reduxjs/toolkit';

export type AppState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
