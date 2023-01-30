import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import { ToastContainer } from "react-toastify";
import ProfileUpdate from "./Auth/ProfileUpdate";

import SingleProduct from "./Cart/SingleProduct";
import Post from "./Components/Post";
import Postdetails from "./Components/Postdetail";
import Cart from "./Components/Cart";
import AllCartData from "./Components/AllCartData";
import MainHome from "./Home/MainHome";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" exact element={<MainHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/updateUserProfile" element={<ProfileUpdate />} />
          <Route path="/addtocart" element={<SingleProduct />} />
          <Route path="/productdetail/:id" element={<Postdetails />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/cartdata" element={<AllCartData />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
