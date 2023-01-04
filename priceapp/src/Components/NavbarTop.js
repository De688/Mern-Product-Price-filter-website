import React from "react";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogin } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { FiMoreVertical } from "react-icons/fi";

function NavbarTop() {
  return (
    <div className="w-full h-[100px] flex justify-around items-center">
      <div className=" text-3xl font-bold text-[#8d3afa]">MernPrice</div>
      <div className=" w-[600px] md:w-[500px] text-4xl md:flex justify-center items-center hidden ">
        <form className="w-[600px] md:w-[500px] h-10   border-2 flex justify-center items-center  border-[#8d3afabb] rounded-full">
          <input
            type="text"
            placeholder="Enter text"
            className="w-full h-full text-sm bg-[#8d3afa21] outline-none pl-6 border-0 rounded-l-full"
          />
          <button type="submit">
            <BiSearch className="text-[#8d3afa] p-2" />
          </button>
        </form>
      </div>
      <div className="w-10 h-10 flex justify-center items-center text-[#8d3afa] cursor-pointer text-2xl rounded-full hover:bg-[#8d3afa3f] transition-all duration-200">
        <FiShoppingCart />
      </div>
      <div className="md:hidden bg-[#8d3afa28] flex justify-center items-center rounded-full text-[#8d3afa] w-8 h-8 text-xl">
        <RxHamburgerMenu />
      </div>
    </div>
  );
}

export default NavbarTop;
