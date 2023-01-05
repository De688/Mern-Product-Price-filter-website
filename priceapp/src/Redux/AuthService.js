import axios from "axios";
const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/register",
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
};

const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/login",
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
};

const Data = { register,login };

export default Data;
