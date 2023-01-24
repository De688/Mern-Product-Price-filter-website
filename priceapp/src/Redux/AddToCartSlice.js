import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const incrementCartItem = createAsyncThunk(
  "cart/incrementQuantity",
  async (payload, { rejectWithValue }) => {
    const { userId, productId } = payload;
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/cart/increment-cart-item/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrementQuantity",
  async (payload, { rejectWithValue }) => {
    const { userId, productId } = payload;
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/cart/decrement-cart-item/${userId}/${productId}`
      );

      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "/cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (payload, thunkAPI) => {
    const { userId, productId } = payload;
    const response = await axios.delete(
      `http://localhost:5000/api/cart/remove-from-cart/${userId}/${productId}`
    );
    return response.data;
  }
);

// actions.js
export const updateCart = createAsyncThunk(
  "cart/update",
  async (data, thunkAPI) => {
    const response = await axios.post(
      "http://localhost:5000/api/cart/add-to-cart",
      data
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  totalPrice: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// cartSlice.js
export const cartSlice = createSlice({
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
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(incrementCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(decrementCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
