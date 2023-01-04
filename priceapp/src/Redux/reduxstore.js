import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthSlice.js";

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
