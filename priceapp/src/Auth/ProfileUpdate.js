import React from "react";
import { MdAccountCircle } from "react-icons/md";

function ProfileUpdate() {
  return (
    <div>
      <div className="w-[100%] h-screen flex justify-center mt-8 shadow-2xl ">
        <form className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-xl h-[560px] bg-white border border-purple-300 selection: flex gap-6 flex-col justify-center rounded-xl items-center border-[#4212793b]">
          <div className="w-full h-14 flex text-2xl text-purple-900 justify-center items-center font-bold ">
            Edit Profile
          </div>
          <div className="w-[120px] relative h-[120px] border-4 border-purple-500 rounded-full flex justify-center items-center ">
            <MdAccountCircle className=" w-[120px] h-[120px] text-purple-400" />
            <label
              htmlFor="file_input"
              className="absolute overflow-hidden ml-[80px] rounded-full cursor-pointer mt-[80px]  bg-purple-500 w-10 h-10 justify-center items-center"
            >
              <input type="file" className="opacity-0 cursor-pointer" />
            </label>
          </div>
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="email"
            name="email"
            onChange={onchange}
            placeholder="Enter your email"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="w-[90%] h-[50px] rounded-md focus:outline-[#9954c7] bg-[#8c44ad21] pl-8"
          />

          <button
            type="submit"
            className="w-[90%] h-10 flex justify-center items-center rounded-md bg-[#320a44] hover:bg-[#ba52eb] text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
