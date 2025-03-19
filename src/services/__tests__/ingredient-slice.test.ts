import {
  getIngredientsThunk,
  ingredientsReducer,
  ingredientsInitialState
} from '@slices';
import { TIngredient } from '@utils-types';
import { describe, expect, test } from '@jest/globals';

describe('Тест редьюсера ingredientsSlice', () => {
  test('проверка статуса "pending"', async () => {
    const requestAction = { type: getIngredientsThunk.pending.type };
    const state = ingredientsReducer(ingredientsInitialState, requestAction);
    expect(state).toEqual({
      ...ingredientsInitialState,
      isLoading: true,
      isError: null
    });
  });

  test('проверка статуса "fulfilled"', async () => {
    const ingredients: Array<TIngredient> = [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ];
    const successAction = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsReducer(ingredientsInitialState, successAction);
    expect(state).toEqual({
      ...ingredientsInitialState,
      isLoading: false,
      isError: null,
      ingredients: ingredients
    });
  });

  test('проверка статуса "rejected"', async () => {
    const error = { message: 'Ошибка загрузки ингредиентов' };
    const failedAction = {
      type: getIngredientsThunk.rejected.type,
      error: error
    };
    const state = ingredientsReducer(ingredientsInitialState, failedAction);
    expect(state).toEqual({
      ...ingredientsInitialState,
      isLoading: false,
      isError: error.message
    });
  });
});
