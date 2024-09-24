import React from "react";
import Title2 from "../utilities/Title2";

const Friends = () => {
  return (
    <div className="mt-4 px-6">
      <Title2 content="Friends" />
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="text-sm font-mono font-normal py-2 px-3 bg-[#4A81D3] text-white rounded-md">
            Message
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="text-sm font-mono font-normal py-2 px-3 bg-[#4A81D3] text-white rounded-md">
            Message
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="">
            <h3>Md Nuruddin Osman</h3>
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="text-sm font-mono font-normal py-2 px-3 bg-[#4A81D3] text-white rounded-md">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
