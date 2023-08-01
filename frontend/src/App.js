import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Auth from "./Auth/Auth";
import VerifyUser from "./Auth/VerifyUser";
import Home from "./components/Home";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/NewProfile/ProfilePage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfilePage from "./components/NewProfile/UserProfilePage";
import Suggestion from "./components/Suggestion/Suggestion";
import EditProfile from "./components/EditProfile/EditProfile";
import Explore from "./components/Explore/Explore";
import Editpost from "./components/EditProfile/Editpost";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { userInformation } = useSelector((state) => state.userRegister);
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const shouldRenderNavbar =
    !["/", "/forgot"].includes(location.pathname) &&
    !location.pathname.startsWith("/verify/") &&
    !location.pathname.startsWith("/reset/");

  return (
    <div className="App">
      {shouldRenderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editpost/:id" element={<Editpost />} />
        <Route path="/verify/:id" element={<VerifyUser />} />
        <Route path="/userprofile/:id" element={<UserProfilePage />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
