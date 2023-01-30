import React from "react";
import { MdAccountCircle } from "react-icons/md";
import ProfileBg from "../images/background.jpg";
import { useNavigate } from "react-router";

function Homethree() {
  const navigate = useNavigate();

  return (
    <div className="hidden  w-[18%] h-[450px] overflow-hidden bg-white rounded-t-xl  flex-col justify-start items-center">
      <div className="w-full h-[100px] ">
        <img src={ProfileBg} alt="myimage" className="w-full h-[100px]" />
      </div>
      <div className="w-full min-h-12 flex justify-center items-center flex-col bg-[#8d3afa46]">
        <MdAccountCircle className="text-[100px] text-[#a068e9] mt-[-50px]" />
        <div className="flex w-full  h-20 justify-around items-center">
          <button
            type="button"
            onClick={() => navigate("/SignUp")}
            className="flex justify-center rounded-sm hover:bg-blue-100 text-[#561da0] items-center min-w-[90px] font-bold h-8 cursor-pointer bg-[#a279d886]"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/SignIn")}
            className="flex justify-center items-center text-[#542592] rounded-sm min-w-[70px] font-bold h-8 cursor-pointer bg-[#a279d886]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homethree;
