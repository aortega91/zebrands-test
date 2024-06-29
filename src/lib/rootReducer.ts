import { combineReducers } from 'redux';
import navigationSlice from '@/src/lib/features/navigation/navigationSlice';

const rootReducer = combineReducers({
  [navigationSlice.name]: navigationSlice.reducer,
});

export default rootReducer;
