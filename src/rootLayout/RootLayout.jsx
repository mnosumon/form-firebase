import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="relative h-screen">
      <div className="w-full h-96 bg-[#4A81D3]">
        <div className="absolute w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
