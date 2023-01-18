import "./App.css";
import Home from "./Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import { ToastContainer } from "react-toastify";
import ProfileUpdate from "./Auth/ProfileUpdate";

import SingleProduct from "./Cart/SingleProduct";
import Post from "./Components/Post";
import Postdetails from "./Components/Postdetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/updateUserProfile" element={<ProfileUpdate />} />
          <Route path="/addtocart" element={<SingleProduct />} />
          <Route path="/productdetail/:id" element={<Postdetails />} />
          <Route path="/Post" element={<Post />} />
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
