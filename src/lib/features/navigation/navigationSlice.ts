/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SCREEN_TITLES, SCREENS } from '@/src/utils/constants';
import { useAppSelector } from '@/src/lib/hooks';
import { AppState } from '@/src/lib/types';

interface NavigationState {
  currentScreenTitle: SCREENS[keyof SCREENS];
}

const initialState: NavigationState = {
  currentScreenTitle: SCREEN_TITLES.HOME,
};

const navigationSlice = createSlice({
  name: 'navigationData',
  initialState,
  reducers: {
    setScreenTitle: (state, action: PayloadAction<SCREENS[keyof SCREENS]>) => {
      state.currentScreenTitle = action.payload;
    },
  },
});

export const { setScreenTitle } = navigationSlice.actions;

export const useNavigationData = () => useAppSelector(
  (state: AppState) => state.navigationData as NavigationState,
);

export default navigationSlice;
