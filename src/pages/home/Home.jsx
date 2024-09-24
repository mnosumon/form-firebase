import React from "react";
import AllUser from "../../components/home/AllUser";
import FriendRequest from "../../components/home/FriendRequest";
import Friends from "../../components/home/Friends";

const Home = () => {
  return (
    <div className=" rounded-lg shadow-md">
      <div className="grid grid-cols-[2fr,5fr] gap-x-16 bg-[#FFFFFF]">
        <div className="w-full bg-[#FBFBFB]  overflow-y-auto">
          <AllUser />
        </div>
        <div className="w-full flex justify-between py-4 pr-10">
          <div className="w-[48%] shadow-lg rounded-lg  h-[560px] pb-3 overflow-y-auto">
            <FriendRequest />
          </div>
          <div className="w-[48%] shadow-lg rounded-lg  h-[560px] pb-3 overflow-y-auto">
            <Friends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
