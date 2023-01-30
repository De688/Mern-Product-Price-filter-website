import React, { useEffect, useState } from "react";
import Homeone from "../Components/Homeone";
import Homethree from "../Components/Homethree";
import Hometwo from "../Components/Hometwo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { fetchProductDetails } from "../Redux/AllProductsSlice";
import { useNavigate, useParams } from "react-router";

function Home() {
  const PublicFilder = "http://localhost:5000/images/";
  const { data, isLoading, isError, isSuccess } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [MostRated, setMostRated] = useState(null);
  const [Ismobo, setIsmobo] = useState(false);

  const checkIsMobo = () => {
    if (window.innerWidth <= 900) {
      setIsmobo(true);
    }
  };
  useEffect(() => {
    checkIsMobo();
  }, []);

  useEffect(() => {
    const getrated = () => {
      const newProducts = [...data].sort((a, b) => b.rating - a.rating);
      const sixthHighestRating = newProducts[5]?.rating;
      const topSixProducts = data.filter(
        (product) => product?.rating >= sixthHighestRating
      );
      setMostRated(topSixProducts);
     
    };
    getrated();
  }, [data]);

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full  min-h-[400px] flex flex-col  md:flex-row justify-around items-center md:items-start mt-6 ">
        <Homeone />
        <Hometwo />
        <Homethree />
      </div>
      <Splide
        options={{
          perPage: Ismobo ? 2 : 5,
          gap: "1rem",
          arrows: false,
          pagination: false,
        }}
        className="w-full flex flex-row justify-around items-center flex-grow-0  overflow-x-auto"
      >
        {MostRated?.map((ratedproduct) => {
          return (
            <SplideSlide key={ratedproduct.id}>
              <img
                onClick={() => {
                  dispatch(fetchProductDetails(ratedproduct._id));
                  navigate(`/productdetail/${ratedproduct._id}`);
                }}
                id={ratedproduct.id}
                className="w-[150px] hover:scale-105 duration-500 h-[150px] md:w-[190px] hover:opacity-1 cursor-pointer rounded-xl md:rounded-xl  md:h-[190px] mx-6"
                src={PublicFilder + ratedproduct.product_image}
                alt={ratedproduct.product_name}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Home;
