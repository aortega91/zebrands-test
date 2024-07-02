import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/src/lib/rootReducer';

const makeStore = () => configureStore({
  reducer: rootReducer,
});

// eslint-disable-next-line import/prefer-default-export
export { makeStore };
