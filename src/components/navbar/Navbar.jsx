import React, { useState } from "react";
import { HomeIcon } from "../../assets/svg/HomeIcon";
import { MessageIcon } from "../../assets/svg/MessageIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/slice/loginSlice/loginSlice";
import { CameraIcon } from "../../assets/svg/CameraIcon";
import Modal from "./modal/Modal";
import { createPortal } from "react-dom";
import AvaterImg from "../../assets/image/avarar.jpg";

const Navbar = () => {
  let [show, setShow] = useState(false);
  const userUid = useSelector((state) => state.login.user);
  let location = useLocation();
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("users");
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="bg-[#232323]">
      <div className="w-3/4 mx-auto flex justify-between items-center py-3">
        <div className="">
          <div className="flex items-center gap-x-5">
            <div className="relative">
              <div className="w-16 h-16  rounded-full bg-[#D9D9D9] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={userUid?.photoURL || AvaterImg}
                  alt=""
                />
              </div>
              <div
                onClick={() => setShow(true)}
                className="w-5 h-5 flex items-center justify-center bg-white rounded-full absolute right-0 bottom-0 cursor-pointer"
              >
                <CameraIcon />
              </div>
              {createPortal(show && <Modal setShow={setShow} />, document.body)}
            </div>
            <div className="">
              <h2 className="text-white">Md Nuruddin Osman</h2>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-x-5">
            <Link
              to="/"
              className={`w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer ${
                location.pathname == "/"
                  ? "bg-[#6CD0FB] text-[#FFFFFF]"
                  : "bg-[#fff] text-[#292D32]"
              }`}
            >
              <HomeIcon />
            </Link>
            <Link
              to="/message"
              className={`w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer ${
                location.pathname == "/message"
                  ? "bg-[#6CD0FB] text-[#FFFFFF]"
                  : "bg-[#fff] text-[#292D32]"
              }`}
            >
              <MessageIcon />
            </Link>
          </div>
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="py-2 px-5 bg-[#6CD0FB] rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
