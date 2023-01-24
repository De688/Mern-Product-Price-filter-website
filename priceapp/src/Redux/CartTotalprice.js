import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const TotalCartPrice = createAsyncThunk(
  "cart/addToCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/cart-total/${userId}`
      );

      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  total: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const CartTotalSlice = createSlice({
  name: "cartTotal",
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
      .addCase(TotalCartPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TotalCartPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.total = action.payload;
        console.log(action.payload);
      })
      .addCase(TotalCartPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const {} = CartTotalSlice.actions;
export default CartTotalSlice.reducer;
