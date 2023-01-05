import React from "react";
import Homeone from "../Components/Homeone";
import Homethree from "../Components/Homethree";
import Hometwo from "../Components/Hometwo";

function Home() {
  return (
    <div className="w-full  min-h-[500px] flex flex-col  md:flex-row justify-around items-center mt-10">
      <Homeone />
      <Hometwo />
      <Homethree />
    </div>
  );
}

export default Home;
