import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { expect, test } from '@jest/globals';

import {
  userSlice,
  ordersSlice,
  ingredientsSlice,
  feedsSlice,
  constructorItemsSlice
} from '@slices';

test('Тест корневого редьюсера', () => {
  const rootReducer = combineSlices(
    userSlice,
    ordersSlice,
    ingredientsSlice,
    feedsSlice,
    constructorItemsSlice
  );

  const store = configureStore({
    reducer: rootReducer
  });

  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
