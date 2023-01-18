import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthSlice.js";
import productsReducer from "./AllProductsSlice.js";
import cartReducer from "./AddToCartSlice.js";

const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
