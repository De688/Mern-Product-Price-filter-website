import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../Redux/AuthSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading.js";

function SignUp() {
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [User, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = User;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success("user registered");
      navigate("/");
    }
    dispatch(reset);
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onchange = (e) => {
    setuser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const CreateUser = () => {
    
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(register(newUser));
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-screen flex ">
      <div className="w-[100%] lg:w-[30%] h-screen flex justify-center mt-8 shadow-2xl ">
        <form
          onSubmit={onSubmit}
          className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[90%] shadow-xl h-[500px] bg-white border border-purple-300 selection: flex gap-6 flex-col justify-center rounded-xl items-center border-[#4212793b]"
        >
          <div className="w-full h-24 flex text-2xl text-purple-900 justify-center items-center font-bold ">
            Sign Up
          </div>
          <input
            type="name"
            name="name"
            value={User.name}
            onChange={onchange}
            placeholder="Enter your name"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="email"
            name="email"
            value={User.email}
            onChange={onchange}
            placeholder="Enter your email"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="password"
            name="password"
            value={User.password}
            onChange={onchange}
            placeholder="Enter your Password"
            className="w-[90%] h-[50px] rounded-md focus:outline-[#9954c7] bg-[#8c44ad21] pl-8"
          />

          <button
            type="submit"
            onClick={CreateUser}
            className="w-[90%] h-10 flex justify-center items-center rounded-md bg-[#320a44] hover:bg-[#ba52eb] text-white"
          >
            {isLoading ? <Loading /> : ""}Register
          </button>

          <div className="w-[90%] mt-2 border-t border-[#4b336649] flex justify-center items-center">
            <p className="w-[30px] flex justify-center items-center text-[#4b336662] mt-[-15px] bg-[#fff]">
              Or
            </p>
          </div>
          <button
            type="button"
            className="w-[90%] h-10 mb-8 rounded-md bg-[#dfdfdf] hover:bg-[#ffffff] text-black border-2 border-[#6673]"
          >
            Sign In with Google account
          </button>
        </form>
      </div>
      <div className="hidden lg:flex w-[70%] h-screen bg-background bg-cover  text-start text-6xl font-bold justify-center items-center">
        <p className="w-[600px] text-white font-serif">
          Search a product and choose from the cheapest seller
        </p>
      </div>
    </div>
  );
}

export default SignUp;
