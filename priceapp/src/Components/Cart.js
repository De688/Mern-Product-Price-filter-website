import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../Redux/AddToCartSlice";
import { BsCartCheckFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";
import Loading from "../Loading/Loading";

function Cart({ productId, price }) {
  

  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cart
  );
 
  const [quantity, setQuantity] = useState(1);
  const [removeSuceessAlam, setremoveSuccessAlam] = useState(false);
  const [removeErrorAlam, setremoveErrorAlam] = useState(false);
  const userID = user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setremoveSuccessAlam(true);
      setTimeout(() => {
        setremoveSuccessAlam(false);
      }, 3000);
    }

    if (isError) {
      setremoveErrorAlam(true);
      setTimeout(() => {
        setremoveErrorAlam(false);
      }, 3000);
    }
  }, [isSuccess, isError]);

  const handleAddToCart = () => {
    if (user) {
      dispatch(
        updateCart({
          userId: userID,
          productId: productId,
          price,
          userId: userID,
          quantity,
        })
      );
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="w-[200px] h-[40px] bg-purple-900 shadow-xl flex justify-center items-center hover:bg-purple-800 text-white"
      >
        {isLoading ? <Loading /> : null}
        Add to Cart
      </button>
      <div className="h-10 pt-4">
        {removeSuceessAlam ? (
          <div className="flex  items-center">
            <BsCartCheckFill className="text-green-600 mr-2" />
            <span>Item added to cart</span>
          </div>
        ) : null}
        {removeErrorAlam ? (
          <div className="flex  items-center text-red-600">
            <FaTimesCircle className="text-red-600 mr-2" />
            <span>Error: {message}</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default Cart;
