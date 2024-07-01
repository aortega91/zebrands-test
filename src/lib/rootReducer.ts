import { combineReducers } from 'redux';
import navigationSlice from '@/src/lib/features/navigation/navigationSlice';
import searchSlice from '@/src/lib/features/search/searchSlice';

const rootReducer = combineReducers({
  [navigationSlice.name]: navigationSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
});

export default rootReducer;
