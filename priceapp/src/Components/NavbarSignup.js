import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../Redux/AuthSlice";
import { useNavigate } from "react-router";
import { MdAccountCircle } from "react-icons/md";
import Profileimg from "../images/profile.webp";

function NavbarSignup() {
  const PublicFilder = "http://localhost:5000/images/";

  const [Logout, setlogout] = useState(false);
  const [Localstorage, setLocalstorage] = useState(false);

  const [locastore, setlocastore] = useState(false);
  const { user, reset } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localstorage = JSON.parse(localStorage.getItem("user"));

  const logmeout = () => {
    setlogout(true);
    navigate("/");
    dispatch(logout());
  };
  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    // if (user) {
    //   setlogin(true);
    // }
    if (logout === true) {
      navigate("/Signin");
    }
    if (localstorage) {
      setLocalstorage(localstorage);
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-[50px] bg-[#531874] flex justify-end items-center">
      {localstorage ? (
        <div className="text-[16px] h-[50px] px-4 flex justify-center items-center border-[#b6b8b777] border-l-2  cursor-pointer">
          <div className="w-[30px] h-[30px] bg-photo rounded-full  mr-2">
            {Localstorage?.ProfileImage ? (
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={PublicFilder + Localstorage?.ProfileImage}
                alt=""
              />
            ) : (
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={Profileimg}
                alt=""
              />
            )}
          </div>
          <p className="font-bold text-white">{Localstorage?.name}</p>
        </div>
      ) : (
        <></>
      )}
      {localstorage ? (
        <button
          onClick={logmeout}
          className="text-[16px] h-[35px] px-4 mr-2 flex justify-center items-center bg-[#6a20af] hover:bg-[#9845e6]  rounded-sm shadow-xl text-white cursor-pointer"
        >
          <CiLogin />
          <p>Log Out</p>
        </button>
      ) : (
        <div
          onClick={() => navigate("Signin")}
          className="text-[16px] h-[50px] px-4 text-white flex justify-center items-center border-[#b6b8b777] border-l-2 hover:bg-[#64238f] cursor-pointer"
        >
          <CiLogin />
          <p>Sign In</p>
        </div>
      )}
    </div>
  );
}

export default NavbarSignup;
