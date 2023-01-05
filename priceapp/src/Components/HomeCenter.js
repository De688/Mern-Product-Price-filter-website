import React from "react";
import Homeslideimages from "../Data";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function HomeCenter() {
  return (
    <div className="w-full h-full rounded-xl ">
      <Splide
        options={{
          type: "loop",
          gap: "1rem",
          autoplay: true,
          pauseOnHover: false,
          resetProgress: false,
        }}
      >
        {Homeslideimages.map((Images, index) => {
          return (
            <SplideSlide key={index}>
              <img
                src={Images.image1}
                alt="heroimage"
                className="w-full rounded-md "
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default HomeCenter;
