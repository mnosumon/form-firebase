import React from "react";
import Ragistration from "./Ragistration";
import Lottie from "lottie-react";
import RegAnimation from "../../animation/resAnimation.json";

const RegistretionForm = () => {
  return (
    <div className="flex justify-between items-center w-2/3 mx-auto p-8 shadow-md rounded-md">
      <div className="w-[48%]">
        <Lottie animationData={RegAnimation} loop={true} />;
      </div>
      <div className="w-[48%]">
        <Ragistration />
      </div>
    </div>
  );
};

export default RegistretionForm;
