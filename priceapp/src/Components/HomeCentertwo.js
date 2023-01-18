import React from "react";
import Homeproductimages from "../Data2";
import { MdLocationOn } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/AllProductsSlice.js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchProductDetails } from "../Redux/AllProductsSlice";
import Loading from "../Loading/Loading";
import StarRatingComponent from "react-star-rating-component";

function HomeCenter2() {
  const PublicFilder = "http://localhost:5000/images/";

  const [rating, setrating] = useState();
  const [options, setOptions] = useState({
    limit: 1,
    skip: 0,
    sort: "product_name",
  });
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(options));
  }, [dispatch, options]);

  // const handleChange = (e) => {
  //   setOptions({ ...options, [e.target.name]: e.target.value });
  // };
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-4xl">
        <Loading className="text-4xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-[90px] bg-transparent rounded-md flex  justify-center flex-wrap mt-10">
      <div className="w-full h-[100px]  bg-white pl-8 mb-8 rounded-xl flex font-sans items-center   text-[#200346c4] text-3xl font-bold">
        Most popular lowest priced sellers
      </div>
      <div className="w-full flex gap-2 flex-wrap  justify-around text-xl bg-transparent">
        {data.map((product) => {
          return (
            <div
              onClick={() => {
                dispatch(fetchProductDetails(product._id));
                navigate(`/productdetail/${product._id}`);
              }}
              key={product._id}
              className="w-[95%] h-[200px] md:w-[400px] md:h-[200px] shadow-md rounded-xl hover:shadow-2xl  flex justify-around items-start hover:border-2 border-purple-400  items-center bg-white "
            >
              <img
                src={PublicFilder + product.product_image}
                alt="prodimage"
                className="w-[190px]  h-[190px] flex flex-wrap border-[#546757] rounded-md "
              />
              <div className="w-[190px] h-full   flex flex-col justify-around ">
                <div className="w-full flex flex-col font-bold  justify-between text-[16px] h-6">
                  <p>{product.product_name}</p>
                  <p>lowest</p>
                </div>

                <div className="w-full flex items-center justify-between text-[16px] h-6">
                  <MdLocationOn />
                  {product.location}` `{" "}
                </div>
                <div className="">
                  <StarRatingComponent
                    className="text-xl text-green-500"
                    name="rate1"
                    starCount={5}
                    starColor={"text-green-500"}
                    value={product.rating}
                  />
                </div>
                <div className="w-full font-bold flex items-center justify-between text-[16px] h-6">
                  TSH {product.product_price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCenter2;
