import React from "react";
import Homeone from "../Components/Homeone";
import Homethree from "../Components/Homethree";
import Hometwo from "../Components/Hometwo";

function Home() {
  return (
    <div className="w-full h-[500px] flex justify-around mt-10">
      <Homeone />
      <Hometwo />
      <Homethree />
    </div>
  );
}

export default Home;
