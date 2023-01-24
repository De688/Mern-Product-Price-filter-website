import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/AddToCartSlice";

function DeleteCartItem({ productId }) {
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ userId, productId }));
  };
  return (
    <div
      className="flex justify-center items-center cursor-pointer text-red-400 hover:text-red-700"
      onClick={() => handleRemoveFromCart()}
    >
      <MdDeleteForever />
      <div>Remove</div>
    </div>
  );
}

export default DeleteCartItem;
