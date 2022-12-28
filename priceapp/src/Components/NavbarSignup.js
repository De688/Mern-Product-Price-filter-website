import React from "react";
import { CiLogin } from "react-icons/ci";

function NavbarSignup() {
  return (
    <div className="w-full min-h-[35px] bg-[#ECF0F3] flex justify-end items-center">
      <div className="text-[16px] h-full px-4 flex justify-center items-center border-[#b6b8b777] border-l-2 hover:bg-[#ffffff] cursor-pointer">
        <CiLogin />
        <p>Sign In</p>
      </div>
    </div>
  );
}

export default NavbarSignup;
