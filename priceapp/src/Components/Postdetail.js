import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { updateRating } from "../Redux/AllProductsSlice";
import Loading from "../Loading/Loading";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import Cart from "./Cart";

function Postdetails() {
  const PublicFilder = "http://localhost:5000/images/";

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [singleproduct, setsingleproduct] = useState();
  const [rating, setRating] = useState(singleproduct?.rating);
  const [averageRatings, setaverageRatings] = useState(singleproduct?.rating);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    // Fetch the current rating of the product from the API
    // and update the component's state with the fetched data
    const fetchCurrentRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${params.id}`
        );
        setsingleproduct(res.data);
        setRating(res.data.rating);
        setaverageRatings(res.data.averageRating);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentRating();
  }, []);

  const handleRating = async (value) => {
    setRating(value);
    setisLoading(true);
    const Data = {
      id: params.id,
    };
    const { id } = Data;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/products/${id}`,
        { rating: value }
      );
      setaverageRatings(res.data.averageRating);
      // dispatch(updateRating({ id: params.id, rating: value }));
      setisLoading(false);
      setisSuccess(true);
      setisError(false);
    } catch (error) {
      setisError(true);
      setisSuccess(false);
      setisLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center mt-10">
      <div className="w-[100%] sm:w-[70%] shadow-md md:w-[80%] min-h-[100px] rounded-sm flex just flex-col md:flex-row bg-white">
        <div className="flex justify-center items-center">
          <img
            className=" object-fill rounded-sm w-[450px] h-[450px] "
            src={PublicFilder + singleproduct?.product_image}
            alt="product image"
          />
        </div>
        <div className="w-[95%] md:w-[50%] min-h-full pl-8 pt-6 mb-10 justify-around">
          <p className="text-2xl font-bold text-purple-900">
            {singleproduct?.product_name}
          </p>
          <p className="text-md mt-4 text-purple-900">
            <span className="font- mr-2">Product Model:</span> {""}
            {singleproduct?.product_model}
          </p>
          <div className="flex flex-col mt-4">
            <p className="font-bold text-purple-400 mr-2">Description</p>
            <p className="text-xl text-purple-900">
              {singleproduct?.Product_description}
            </p>
          </div>

          <p className="flex text-md pt-2 text-purple-900">
            <span className="font-bold flex justify-center items-center mr-2">
              {" "}
              <MdLocationOn /> Loacation :
            </span>
            {""}
            {singleproduct?.location}
          </p>
          <p className="text-purple-900 pt-2 text-md">
            <span className="font-bold mr-2"> Phone :</span>
            {""}
            {singleproduct?.phone_number}
          </p>
          <p className="text-md font-bold pt-2 text-purple-900">
            <span className="font-bold">Price:</span> TSH {""}
            {singleproduct?.product_price}
          </p>
          <div>
            <div className="flex  items-center">
              <StarRatingComponent
                className="text-4xl"
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={handleRating}
              />
              {isLoading ? (
                <div className=" flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-[200px] flex justify-center items-center"></div>
            {isSuccess ? <div>Thanks for your rating!</div> : ""}

            {isError ? (
              <div className="text-red-500">
                An error occurred, please try again
              </div>
            ) : (
              ""
            )}
            <div>Average rating: {averageRatings}</div>
          </div>
          {user ? (
            <div className="mt-10 ">
              <Cart productId={params.id} />
            </div>
          ) : (
            <div className="mt-10 ">
              <Link to="/signin" className="font-bold text-blue-600">
                Sign in{" "}
              </Link>{" "}
              to access Cart functionalities
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Postdetails;
