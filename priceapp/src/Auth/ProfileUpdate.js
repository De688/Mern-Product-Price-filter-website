import React, { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateProfile, reset } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router";
import Loading from "../Loading/Loading";

function ProfileUpdate() {
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const localData = JSON.parse(localStorage.getItem("user"));

  // const params = useParams();
  const id = localData.id;

  const [file, setfile] = useState(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const submitData = async (e) => {
    e.preventDefault();
    const newData = {
      name: name,
      email: email,
      password: password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newData.ProfileImage = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error.messsage);
      }
    }
    // try {
    //   console.log(newData);
    //   const response = await axios.put(
    //     `http://localhost:5000/api/user/updateuserdata/${id}`,
    //     newData
    //   );
    //   console.log(response.data);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error.message);
    // }

    const initalUser = { id: id, data: newData };
    dispatch(updateProfile(initalUser));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User profile updated!");
      navigate("/");
    }
    dispatch(reset);
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div>
      <div className="w-[100%] h-screen flex justify-center mt-8 shadow-2xl ">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-xl h-[560px] bg-white border border-purple-300 selection: flex gap-6 flex-col justify-center rounded-xl items-center border-[#4212793b]"
        >
          <div className="w-full h-14 flex text-2xl text-purple-900 justify-center items-center font-bold ">
            Edit Profile
          </div>
          <div className="w-[120px] relative h-[120px] border-4 border-purple-500 rounded-full flex justify-center items-center ">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="imgh"
                className="w-[120px] rounded-full"
              />
            ) : (
              <MdAccountCircle className=" w-[120px] h-[120px] text-purple-400" />
            )}

            <label
              htmlFor="file_input"
              className="absolute overflow-hidden ml-[80px] rounded-full cursor-pointer mt-[80px]  bg-purple-500 w-10 h-10 justify-center items-center"
            >
              <input
                type="file"
                maltiple="false"
                onChange={(e) => setfile(e.target.files[0])}
                className="opacity-0 cursor-pointer"
              />
            </label>
          </div>
          <input
            type="name"
            name="name"
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter your name"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="w-[90%] h-[50px] focus:outline-[#9954c7] bg-[#7a44ad21] rounded-md pl-8"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your Password"
            className="w-[90%] h-[50px] rounded-md focus:outline-[#9954c7] bg-[#8c44ad21] pl-8"
          />

          <button
            type="submit"
            onClick={submitData}
            className="w-[90%] h-10 flex justify-center items-center rounded-md bg-[#320a44] hover:bg-[#ba52eb] text-white"
          >
            {isLoading ? <Loading /> : ""}
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
