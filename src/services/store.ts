import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  userSlice,
  ordersSlice,
  ingredientsSlice,
  feedsSlice,
  constructorItemsSlice
} from '@slices';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  userSlice,
  ordersSlice,
  ingredientsSlice,
  feedsSlice,
  constructorItemsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
