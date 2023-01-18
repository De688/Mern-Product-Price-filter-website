import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./AuthService";
import { useParams } from "react-router";

//create asyncthunk functions

//get id
export const adduserid = createAsyncThunk("user/addAuserid", (id, thunkAPI) => {
  try {
    return AuthService.adduserid(id);
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
});

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
//for profile update

export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async (initalUser, thunkAPI) => {
    const { id, data } = initalUser;
    try {
      return await AuthService.updateuser(id, data);
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

//log out function
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await AuthService.logout();
  } catch (error) {
    const message =
      (error.response &&
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.fulfillWithValue(message);
  }
});

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
      })
      //updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogin = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
