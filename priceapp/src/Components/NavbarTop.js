import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogin } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../Redux/AddToCartSlice";

function NavbarTop() {
  const localstorage = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart.items);
  const { items, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [CartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  useEffect(() => {
    // if (userId && (!cartItems || cartItems.length === 0)) {

    // }
    const cartnumber = () => {
      if (cartItems.length > 0) {
        setCartNumber(cartItems.length);
      }
    };
    cartnumber();
  }, [cartItems]);

  const GoToCart = () => {
    navigate("/cartdata");
  };

  return (
    <div className="w-full h-[100px] flex justify-around items-center">
      <div className=" text-3xl font-bold text-[#8d3afa]">MernPrice</div>
      <div className=" w-[600px] md:w-[600px] text-4xl md:flex justify-center items-center hidden ">
        <form className="w-[600px] md:w-[600px] h-12  bg-[#8d3afa21]   flex justify-center items-center  border-[#8d3afabb] rounded-full">
          <input
            type="text"
            placeholder="Enter text"
            className="w-full h-full text-sm outline-none pl-6 border-0 bg-transparent  rounded-l-full"
          />
          <button type="submit">
            <BiSearch className="text-[#8d3afaab] p-2 mr-2" />
          </button>
        </form>
      </div>
      <div
        onClick={GoToCart}
        className="w-10 h-10 flex relative justify-center items-center text-[#8d3afa] cursor-pointer text-2xl rounded-full hover:bg-[#8d3afa3f] transition-all duration-200"
      >
        <FiShoppingCart />
        {CartNumber ? (
          <span className="absolute w-4 h-4 ml-4 mb-4 bg-red-500 rounded-full text-white text-[10px] flex justify-center items-center">
            {CartNumber}
          </span>
        ) : (
          ""
        )}
      </div>
      {localstorage ? (
        <Link
          to={"/updateUserProfile"}
          className="hover:text-black w-10 h-10 flex justify-center items-center text-[#8d3afa] cursor-pointer text-2xl rounded-full bg-[#8d3afa42] transition-all duration-200"
        >
          <MdManageAccounts />
        </Link>
      ) : (
        ""
      )}
      <div className="md:hidden bg-[#8d3afa28] flex justify-center items-center rounded-full text-[#8d3afa] w-8 h-8 text-xl">
        <RxHamburgerMenu />
      </div>
    </div>
  );
}

export default NavbarTop;
