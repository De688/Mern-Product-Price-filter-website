import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthSlice.js";

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export default store;
