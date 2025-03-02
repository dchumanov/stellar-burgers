import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

// Загружаем ВСЕ заказы (лента)
export const fetchAllFeedsThunk = createAsyncThunk(
  'feeds/fetchAllFeeds',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Загружаем заказ по номеру
export const fetchOrderByNumberThunk = createAsyncThunk(
  'feeds/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(number);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type TFeedsState = {
  error: string | null | undefined;
  feeds: {
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
  };
  orderByNumber: TOrder[] | [];
};

const initialState: TFeedsState = {
  error: null,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderByNumber: []
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getAllOrdersSelector: (state) => state.feeds.orders,
    getFeedsSelector: (state) => state.feeds,
    getOrderSelector: (state) => state.orderByNumber[0]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeedsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchAllFeedsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.feeds = { ...action.payload };
      })
      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.error = null;
        state.orderByNumber = action.payload.orders;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;

export const { getAllOrdersSelector, getFeedsSelector, getOrderSelector } =
  feedsSlice.selectors;
