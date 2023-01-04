import axios from "axios";

const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:3000/api/user/register",
    userData
  );
  if (response.data) {
    localStorage.setItem(JSON.stringify(response.data));
  }
  console.log(response.data);
};

const Data = { register };

export default Data;
