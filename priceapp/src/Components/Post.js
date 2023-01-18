import React, { useState, useEffect } from "react";
import axios from "axios";
import { postProduct } from "../Redux/AllProductsSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
// import { postProduct } from "./postThunk";

function Post() {
  const [productName, setProductName] = useState("");
  const [productModel, setProductModel] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [file, setfile] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [senderId, setSenderId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  const localData = JSON.parse(localStorage.getItem("user"));
  const id = localData.id;
  const handleImage = (event) => {
    // handle image using multer
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postProductData = {
      product_name: productName,
      product_model: productModel,
      product_price: productPrice,
      location: location,
      phone_number: phoneNumber,
      Product_description: productDescription,
      senderId: id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      postProductData.product_image = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error.messsage.text);
      }
    }

    dispatch(postProduct(postProductData));

    setProductName("");
    setProductModel("");
    setProductPrice(0);
    setfile("");
    setLocation("");
    setPhoneNumber("");
    setProductDescription("");
    setSenderId("");
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Product added successfull!");
    }
  }, [isSuccess, isError, message]);

  return (
    <div className="w-full bg-white flex justify-center items-center">
      <form
        encType="multiparty/form-data"
        onSubmit={handleSubmit}
        className="w-[90%] bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-bold items-center text-purple-900 pb-[10px] mb-[10px] border-b-2 border-purple-500">
          Dashboard
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Model
          </label>
          <input
            type="text"
            value={productModel}
            onChange={(event) => setProductModel(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Price
          </label>
          <input
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Image
          </label>
          <input
            type="file"
            maltiple="false"
            onChange={(e) => setfile(e.target.files[0])}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full focus:outline-purple-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Description
          </label>
          <textarea
            rows="4"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>

        <button className="bg-purple-900 text-white p-2 flex justify-center items-center rounded-lg hover:bg-purple-700">
          {isLoading ? <Loading /> : ""}Post Product
        </button>
      </form>
    </div>
  );
}
export default Post;
