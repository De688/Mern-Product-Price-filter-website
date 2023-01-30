import React from "react";
import NavbarSignup from "../Components/NavbarSignup";
import NavbarTop from "../Components/NavbarTop";
import SearchBarMobo from "../Components/SearchBarMobo";

function Navbar() {
  return (
    <div className=" sticky w-full min-h-20 bg-[#ffffff] flex flex-col shadow-md">
      <NavbarSignup />
      <NavbarTop />
      <SearchBarMobo />
    </div>
  );
}

export default Navbar;
