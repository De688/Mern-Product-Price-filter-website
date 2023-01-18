// import { createSlice } from "@reduxjs/toolkit";

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/add-to-cart", data);
//       return res.data;
//     } catch (err) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const initialState = {
//   items: [],
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCart.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.items = [...state.items, action.payload];
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.error.message;
//       });
//   },
// });

// export const {} = cartSlice.actions;

// export default cartSlice.reducer;
