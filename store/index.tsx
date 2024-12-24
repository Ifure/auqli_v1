import { configureStore } from '@reduxjs/toolkit';

import { auth } from '@/services/auth';

import authStateReducer from './features/auth/authSlice';
import { rtkQueryErrorLogger } from './middlewares';
import { category } from '@/services/categories';

export const store = configureStore({
  reducer: {
    authState: authStateReducer,
    [auth.reducerPath]: auth.reducer,
    [category.reducerPath]: category.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      category.middleware,
      rtkQueryErrorLogger
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
