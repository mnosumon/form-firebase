import React from "react";
import { AddFriendIcon } from "../../assets/svg/AddFriendIcon";
import Title2 from "../utilities/Title2";

const AllUser = () => {
  return (
    <div className="mt-7 px-7">
      <Title2 content="All users" />
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="">
          <AddFriendIcon />
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="">
          <AddFriendIcon />
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="">
          <AddFriendIcon />
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="">
          <AddFriendIcon />
        </div>
      </div>
    </div>
  );
};

export default AllUser;