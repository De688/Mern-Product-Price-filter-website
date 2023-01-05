import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

//create asyncthunk functions

//for register

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await AuthService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for login

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await AuthService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
  message: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // for register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogin = false;
        state.message = action.payload;
        state.user = null;
      })

      // for login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogin = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
