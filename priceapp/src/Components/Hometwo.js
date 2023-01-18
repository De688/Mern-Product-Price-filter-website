import React from "react";
import HomeCenter from "../Components/HomeCenter";
import HomeCenter2 from "../Components/HomeCentertwo";

function Hometwo() {
  return (
    <div className=" md:w-[78%]  lg:w-[78%] w-[90%] h-[250px] sm:h-[400px] flex flex-col justify-center ">
      <HomeCenter />
      <HomeCenter2 />
    </div>
  );
}

export default Hometwo;
