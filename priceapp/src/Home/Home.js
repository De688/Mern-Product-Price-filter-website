import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";

function Home() {
  return (
    <div className="w-full min-screen flex justify-around mt-10">
      <div className="w-[22%] min-h-[100px] bg-white rounded-t-xl">
        <div className="w-full border-b-2 text-xl font-bold border-[#bebebe60] h-14 flex justify-center items-center">
          <BiCategoryAlt />
          <p className="pl-2">Categiries</p>
        </div>
      </div>
      <div className="w-[50%] min-h-100 bg-white rounded-t-xl">home</div>
      <div className="w-[22%] min-h-[100px] bg-white rounded-t-xl flex flex-col justify-center items-center">
        <div className="w-full h-[100px] bg-transparent"></div>
        <div className="w-full min-h-12 flex justify-center items-center flex-col bg-[#8d3afa46]">
          <MdAccountCircle className="text-[100px] text-[#a068e9] mt-[-50px]" />
          <div className="flex w-full h-20 justify-around items-center">
            <p className="flex justify-center rounded-sm  text-[#561da0] items-center min-w-[90px] font-bold h-8 cursor-pointer bg-[#a279d886]">
              Register
            </p>
            <p className="flex justify-center items-center text-[#542592] rounded-sm min-w-[70px] font-bold h-8 cursor-pointer bg-[#a279d886]">
              Log In
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
