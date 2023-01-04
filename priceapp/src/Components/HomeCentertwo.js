import React from "react";
import Homeproductimages from "../Data2";

function HomeCenter2() {
  return (
    <div className="w-full h-[90px] bg-white rounded-md flex   justify-center flex-wrap mt-10">
      <div className="w-full h-14  rounded-md flex  flex-wrap  text-[#360575c4] text-3xl font-bold">
        Most popular lowest priced sellers
      </div>
      <div className="w-full flex gap-2 flex-wrap justify-around text-xl bg-white">
        {Homeproductimages.map((Imgs, index) => {
          return (
            <div key={index} className=" flex  ">
              <img
                src={Imgs.image1}
                alt="prodimage"
                className="w-[120px] hover:shadow-2xl h-[120px] flex flex-wrap border-[#546757] rounded-md  shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCenter2;
