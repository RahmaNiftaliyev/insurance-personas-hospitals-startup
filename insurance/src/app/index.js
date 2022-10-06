import citizensReducer from '../features/redux/citizensSlice';
import hospitalsReducer from '../features/redux/hospitalsSlice';
import { hospitalsApi } from './../features/redux/hospitalsSlice';
import { citizensApi } from './../features/redux/citizensSlice';

export const rootReducer = {
  citizens: citizensReducer,
  [citizensApi.reducerPath]: citizensApi.reducer,
  hospitals: hospitalsReducer,
  [hospitalsApi.reducerPath]: hospitalsApi.reducer,
};
