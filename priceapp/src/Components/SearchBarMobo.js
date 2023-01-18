import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";

function SearchBarMobo() {
  return (
    <div className="text-4xl flex flex-col  justify-center items-center md:hidden ">
      <form className="w-[90%] h-10  border-2 bg-[#8d3afa21]  flex justify-center items-center rounded-full">
        <input
          type="text"
          placeholder="Search product"
          className="w-full pl-4 placeholder:text-sm text-sm flex justify-center items-center  h-full bg-slate-200 border-0 rounded-l-full focus:outline-none"
        />
        <button type="submit" className="text-[#8d3afa] text-xl p-2">
          <BiSearch />
        </button>
      </form>
      <div className="w-full h-10"></div>
    </div>
  );
}

export default SearchBarMobo;
