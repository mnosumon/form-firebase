import React, { useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import { Cropper } from "react-cropper";

const CropModal = ({ setImage, cropperRef, image, getCropData }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen  flex items-center justify-center">
      <div className="w-1/3 bg-[#f6dada] relative rounded-md p-4">
        <div className="">
          <div
            onClick={() => setImage()}
            className="w-8 h-8 rounded-full text-[#2D2D2D] absolute right-2 top-2 cursor-pointer flex justify-center items-center"
          >
            <CrossIcon />
          </div>
        </div>
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div className="w-full border border-slate-600 mx-auto rounded-md p-2 mt-3">
          <Cropper
            ref={cropperRef}
            style={{ height: "400px", width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <h4
          onClick={getCropData}
          className="text-center text-lg py-2 bg-[#6CD0FB] cursor-pointer rounded-md mt-2 font-bold"
        >
          Upload Photo
        </h4>
      </div>
    </div>
  );
};

export default CropModal;
