import React from "react";
import NavbarSignup from "../Components/NavbarSignup";
import NavbarTop from "../Components/NavbarTop";
import SearchBarMobo from "../Components/SearchBarMobo";

function Navbar() {
  return (
    <div className="w-full min-h-20 bg-[#ffffff] flex flex-col">
      <NavbarSignup />
      <NavbarTop />
      <SearchBarMobo />
    </div>
  );
}

export default Navbar;
