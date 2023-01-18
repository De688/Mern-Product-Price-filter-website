import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (productData) => {
    const response = await axios.post(
      `http://localhost:5000/api/products/addProduct`,
      productData
    );
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (options) => {
    const response = await axios.get(`http://localhost:5000/api/products`, {
      params: options,
    });

    return response.data;
  }
);

export const updateRating = createAsyncThunk(
  "products/updateRating",

  async ({ id, rating }) => {
    const response = await axios.patch(
      `http://localhost:5000/api/products/${id}`,
      { rating }
    );

    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  data: [],
  details: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
  message: "",
};

const productsSlice = createSlice({
  name: "products",
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
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(postProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(updateRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;

        state.data = Array.isArray(action.payload)
          ? action.payload
          : Object.values(action.payload);
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export default productsSlice.reducer;
