// import React, { useState, useEffect } from "react";

// import { addToCart } from "../Redux/CartSlice";

// import { useSelector, useDispatch } from "react-redux";

// function AddToCartButton(props) {
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);

//   const handleClick = () => {
//     dispatch(
//       addToCart({ productId: props.productId, quantity, userId: props.userId })
//     );
//   };

//   useEffect(() => {
//     // if (cart.isLoading) {
//     //   console.log("Loading...");
//     // }
//     // if (cart.error) {
//     //   console.log("Error: ", cart.error);
//     // }
//     // if (cart.items) {
//     //   console.log("Cart updated: ", cart.items);
//     // }
//   }, [cart]);

//   return (
//     <div className="flex justify-center">
//       <input
//         className="border rounded-md p-2 mr-2"
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         min="1"
//       />
//       <button
//         className="bg-indigo-500 text-white p-2 rounded-md"
//         onClick={handleClick}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default AddToCartButton;
