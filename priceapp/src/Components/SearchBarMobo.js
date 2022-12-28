import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";

function SearchBarMobo() {
  return (
    <div className="text-4xl flex flex-col  justify-center items-center md:hidden ">
      <form className="w-[90%] h-10  border-2 border-[#8d3afab4] flex justify-center items-center border-gray-700 rounded-md">
        <input
          type="text"
          className="w-full bg-[#8d3afa2f] h-full bg-slate-200 border-0 rounded-l-md"
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
