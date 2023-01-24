import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthSlice.js";
import productsReducer from "./AllProductsSlice.js";
import cartReducer from "./AddToCartSlice.js";
import cartTotal from "./CartTotalprice.js";

const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productsReducer,
    cart: cartReducer,
    cartTotal: cartTotal,
  },
});

export default store;
