import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../Redux/AddToCartSlice";
import SearchProducts from "./SearchProducts";

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

  //search query
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
  };

  //ende//

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  useEffect(() => {
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

  const directhandleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/api/products/search?q=${searchQuery}`
    );

    setResults(response.data);
    console.log(response.data);
  };
  //search query again
  useEffect(() => {
    const handleSearch = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?q=${searchQuery}`
      );

      setResults(response.data);
      console.log(response.data);
    };
    handleSearch();
  }, [searchQuery]);

  return (
    <div className=" w-full h-[100px] flex justify-around items-center">
      <div className=" text-3xl font-bold text-[#8d3afa]">MernPrice</div>
      <div className=" w-[600px] md:w-[600px] text-4xl md:flex justify-center items-center hidden flex-col relative ">
        <form
          formhandler={handleForm}
          className="w-[600px] md:w-[600px] h-12  bg-[#8d3afa21]   flex justify-center items-center  border-[#8d3afabb] rounded-full"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter text"
            className="w-full h-full text-sm outline-none pl-6 border-0 bg-transparent  rounded-l-full"
          />
          <button onClick={directhandleSearch} type="submit">
            <BiSearch className="text-[#8d3afaab] p-2 mr-2 " />
          </button>
        </form>
        <div className="absolute z-60">
          <SearchProducts results={results} className=" " />
        </div>
      </div>
      <div
        onClick={GoToCart}
        className="w-10 h-10 flex active:bg-[#8d3afa28] relative justify-center items-center text-[#8d3afa] cursor-pointer text-2xl rounded-full hover:bg-[#8d3afa3f] transition-all duration-200"
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
      <div className="md:hidden bg-[#8d3afa28]  flex justify-center items-center rounded-full text-[#8d3afa] w-8 h-8 text-xl">
        <RxHamburgerMenu />
      </div>
    </div>
  );
}

export default NavbarTop;
