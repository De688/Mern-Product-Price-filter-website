import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//createAsyncthunk functions

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
  reducer: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false);
    },
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
