import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../Redux/AuthSlice.js";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading.js";

function SignIn() {
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = User;

  const onChange = (e) => {
    e.preventDefault();
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success("user logged in");
      navigate("/");
    }
    dispatch(reset);
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  //function to dispatch userdata
  const dispatchuserdata = (e) => {
    e.preventDefault();

    const newUserdata = {
      email: email,
      password: password,
    };

    dispatch(login(newUserdata));
  };

  return (
    <div className="w-full h-screen flex ">
      <div className="w-[100%] lg:w-[30%] h-screen flex justify-center mt-8 shadow-2xl ">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[90%] shadow-xl h-[500px] bg-white border border-purple-300 selection: flex gap-6 flex-col justify-center rounded-xl items-center border-[#4212793b]"
        >
          <div className="w-full h-24 flex text-2xl text-purple-900 justify-center items-center font-bold ">
            Sign In
          </div>
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            className="w-[90%] h-[50px] rounded-md focus:outline-[#9954c7] bg-[#8c44ad21] pl-8"
          />
          <button
            type="submit"
            onClick={dispatchuserdata}
            className="w-[90%] h-10 flex justify-center items-center rounded-md bg-[#320a44] hover:bg-[#ba52eb] text-white"
          >
            {isLoading ? <Loading /> : ""}Log In
          </button>
          <div className="w-[90%]">
            <p className="text-purple-900 ">
              You don't have an account yet ?{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create account
              </span>
            </p>
          </div>
          <div className="w-[90%] mt-2 border-t border-[#4b336649] flex justify-center items-center">
            <p className="w-[30px] flex justify-center items-center text-[#4b336662] mt-[-15px] bg-[#fff]">
              Or
            </p>
          </div>
          <button
            type="submit"
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

export default SignIn;
