import React from "react";
import AllUser from "../../components/home/AllUser";

const Home = () => {
  return (
    <div className="grid grid-cols-[2fr,5fr] gap-x-16">
      <div className="w-full bg-[#FBFBFB]">
        <AllUser />
      </div>
      <div className="">
        <div className="">Friend request</div>
        <div className="">Message</div>
      </div>
    </div>
  );
};

export default Home;
