import React from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";

const Modal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#b6acac8a] flex items-center justify-center">
      <div className="w-1/3 h-96 bg-orange-500 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full text-[#2D2D2D]">
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};

export default Modal;
