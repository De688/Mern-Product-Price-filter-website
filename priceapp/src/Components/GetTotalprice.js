import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { TotalCartPrice } from "../Redux/CartTotalprice";
import Loading from "../Loading/Loading";

function GetTotalprice() {
  const firstcartData = useSelector((state) => state.cart.items);
  const { total, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.cartTotal
  );
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;

  const [cartTotalPrice, setcartTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TotalCartPrice(userId));
  }, []);

  useEffect(() => {
    setcartTotalPrice(total);
  }, [total]);

  const gettotalPrice = () => {
    dispatch(TotalCartPrice(userId));
  };

  console.log(total);
  return (
    <div className="w-500px ">
      <button
        onClick={gettotalPrice}
        className="w-200px h-10 bg-purple-900 text-white"
      >
        See Total Price
      </button>
      {isLoading ? (
        <di>
          <Loading />
        </di>
      ) : (
        ""
      )}
      {isError ? <di>{message}</di> : ""}
      {isSuccess ? <di>{cartTotalPrice.cartTotal}</di> : ""}
    </div>
  );
}

export default GetTotalprice;
