import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    const { userID, productId } = payload;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/add-to-cart/${userID}/${productId}`
      );
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
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
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});
export const {} = cartSlice.actions;
export default cartSlice.reducer;
