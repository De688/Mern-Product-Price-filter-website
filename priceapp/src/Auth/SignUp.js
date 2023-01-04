import React, { useState } from "react";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onchange = (e) => {
    setuser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const CreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    console.log(newUser);
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
            value={user.name}
            onChange={onchange}
            placeholder="Enter your name"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onchange}
            placeholder="Enter your email"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onchange}
            placeholder="Enter your Password"
            className="w-[90%] h-[50px] rounded-md focus:outline-[#9954c7] bg-[#8c44ad21] pl-8"
          />
          <button
            type="submit"
            onClick={CreateUser}
            className="w-[90%] h-10 rounded-md bg-[#320a44] hover:bg-[#ba52eb] text-white"
          >
            Register
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
