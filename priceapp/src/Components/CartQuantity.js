import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { incrementCartItem, decrementCartItem } from "../Redux/AddToCartSlice";

export const CartQuantity = ({ productId, productQuantity }) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementCartItem({ userId, productId }));
  };

  const handleDecrement = () => {
    dispatch(decrementCartItem({ userId, productId }));
  };

  return (
    <>
      <div className="w-[120Px] flex justify-around items-center">
        <button
          className="bg-purple-600 hover:bg-purple-900 w-[20px] h-[20px] flex justify-center items-center text-white rounded-md"
          onClick={handleDecrement}
        >
          <AiOutlineMinus />
        </button>
        <span className="font-bold text-xl">{productQuantity}</span>

        <button
          className="bg-purple-600 hover:bg-purple-900 w-[20px] h-[20px] flex justify-center items-center text-white rounded-md"
          onClick={handleIncrement}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};
