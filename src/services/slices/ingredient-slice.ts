import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  isError: string | null | undefined;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  isError: null
};
export { initialState as ingredientsInitialState };

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingIngredientsSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ingredients = payload;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const { getIngredientsSelector, getLoadingIngredientsSelector } =
  ingredientsSlice.selectors;
