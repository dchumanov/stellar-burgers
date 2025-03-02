import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  resetPasswordApi,
  forgotPasswordApi,
  getOrdersApi
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { TOrder, TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(registerData);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(loginData);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (updateUserData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(updateUserData);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logoutApi();
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserOrdersThunk = createAsyncThunk(
  'user/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUserThunk()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isError: boolean | null;
  isAuthChecked: boolean;
  userOrders: TOrder[] | [];
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isError: false,
  isAuthChecked: false,
  userOrders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.isError = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getUserDataSelector: (state) => state.user,
    isLoadingSelector: (state) => state.isLoading,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isErrorSelector: (state) => state.isError,
    getUserOrdersSelector: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isAuthChecked = true;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isAuthChecked = true;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isAuthChecked = true;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(forgotPasswordThunk.fulfilled, resetPasswordThunk.fulfilled),
        (state) => {
          state.isError = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUserThunk.pending,
          registerUserThunk.pending,
          getUserThunk.pending,
          updateUserThunk.pending,
          getUserOrdersThunk.pending,
          forgotPasswordThunk.pending,
          resetPasswordThunk.pending
        ),
        (state) => {
          state.isError = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUserThunk.rejected,
          registerUserThunk.rejected,
          getUserThunk.rejected
        ),
        (state) => {
          state.isError = true;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          updateUserThunk.rejected,
          getUserOrdersThunk.rejected,
          forgotPasswordThunk.rejected,
          resetPasswordThunk.rejected
        ),
        (state) => {
          state.isError = true;
          state.isLoading = false;
        }
      );
  }
});

export const userReducer = userSlice.reducer;

export const {
  isErrorSelector,
  isAuthCheckedSelector,
  getUserDataSelector,
  getUserOrdersSelector,
  isLoadingSelector
} = userSlice.selectors;

export const { resetErrorMessage, authChecked, userLogout } = userSlice.actions;
