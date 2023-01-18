import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import { TbShirt } from "react-icons/tb";
import { MdOutlineChair } from "react-icons/md";
import { MdElectricalServices } from "react-icons/md";

function Homeone() {
  return (
    <>
      <div className="hidden md:flex flex-col justify-start shadow-xl bg-[#fdfdfd] w-[20%] min-h-full rounded-t-xl">
        <div className="w-full cursor-pointer text-[#8d3afa] border-b-2 text-xl font-bold border-[#bebebe60] h-14 flex justify-center items-center">
          <BiCategoryAlt />
          <p className="pl-2 text-[#8d3afa]">Categiries</p>
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <FaMobileAlt className="mr-4" />
          Mobile phones
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <TbShirt className="mr-4" />
          Clothes
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <MdOutlineChair className="mr-4" />
          Furniture
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <MdElectricalServices className="mr-4" />
          Electronic
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <FaMobileAlt className="mr-4" />
          Mobile phones
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <TbShirt className="mr-4" />
          Clothes
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <MdOutlineChair className="mr-4" />
          Furniture
        </div>
        <div className="w-full cursor-pointer text-[#4a1f83] h-10 flex justify-start pl-5 items-center ">
          <MdElectricalServices className="mr-4" />
          Electronic
        </div>
      </div>
      <div className="md:hidden w-[95%] min-h-[300px] flex flex-wrap justify-center items-start">
        <FaMobileAlt className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e] bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
        <MdOutlineChair className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e] bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
        <TbShirt className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e] bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
        <FaMobileAlt className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e] bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
        <MdOutlineChair className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e] bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
        <MdElectricalServices className="mr-4 text-[100px] sm:text-[110px] cursor-pointer hover:bg-[#633e945e]                                                    bg-[#4a1f835e] text-[#4a1f83] rounded-xl p-6" />
      </div>
    </>
  );
}

export default Homeone;
