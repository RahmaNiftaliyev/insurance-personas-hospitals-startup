import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './index';
import { hospitalsApi } from './../features/redux/hospitalsSlice';
import { citizensApi } from './../features/redux/citizensSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospitalsApi.middleware, citizensApi.middleware),
});

setupListeners(store.dispatch);
