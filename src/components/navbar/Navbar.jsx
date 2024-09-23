import React from "react";
import { HomeIcon } from "../../assets/svg/HomeIcon";
import { MessageIcon } from "../../assets/svg/MessageIcon";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  console.log(location);

  return (
    <nav className="bg-[#232323]">
      <div className="w-3/4 mx-auto flex justify-between items-center py-3">
        <div className="">
          <div className="flex items-center gap-x-5">
            <div className="w-16 h-16 rounded-full bg-[#D9D9D9]"></div>
            <div className="">
              <h2 className="text-white">Md Nuruddin Osman</h2>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-x-5">
            <div
              className={`w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer bg-[#fff] ${
                location.pathname === "/"
                  ? "bg-[#6CD0FB] text-[#FFFFFF]"
                  : "bg-[#fff] text-[#292D32]"
              }`}
            >
              <HomeIcon />
            </div>
            <div
              className={`w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer bg-[#fff] ${
                location.pathname === "/message"
                  ? "bg-[#6CD0FB] text-[#FFFFFF]"
                  : "bg-[#fff] text-[#292D32]"
              }`}
            >
              <MessageIcon />
            </div>
          </div>
        </div>
        <div className="">
          <button className="py-2 px-5 bg-[#6CD0FB] rounded-md">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
