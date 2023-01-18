import axios from "axios";

export const addToCart = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/cart/add-to-cart", data);
    dispatch({ type: "ADD_TO_CART", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
