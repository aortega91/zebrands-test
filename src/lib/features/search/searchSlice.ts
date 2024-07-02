/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/src/lib/hooks';
import { AppState } from '@/src/lib/types';

type SearchState = {
  searchText: string;
};

const initialState:SearchState = {
  searchText: '',
};

const searchSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;

export const useSearchData = () => useAppSelector(
  (state: AppState) => state.searchData as SearchState,
);

export default searchSlice;
