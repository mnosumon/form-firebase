import React, { useRef } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import { GallaryIcon } from "../../../assets/svg/GallaryIcon";

const CropModal = ({ setShow }) => {
  let choeseRef = useRef();

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0d0b0bcc] flex items-center justify-center">
      <div className="w-1/3 h-96 bg-white relative  rounded-md p-4">
        <h4 className="text-center text-lg py-5 font-bold h-1/5">
          Upload Photo
        </h4>
        <div
          onClick={() => setShow(false)}
          className="w-8 h-8 rounded-full text-[#2D2D2D] absolute right-2 top-2 cursor-pointer flex justify-center items-center"
        >
          <CrossIcon />
        </div>

        <div className="w-full h-4/5 border border-slate-600 mx-auto rounded-md p-3">
          <div
            onClick={() => choeseRef.current.click()}
            className="w-full h-full rounded-md bg-slate-200 cursor-pointer flex justify-center items-center"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="">
                <GallaryIcon />
              </div>
              <h5>Choese your photo</h5>
            </div>
            <input ref={choeseRef} type="file" hidden />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
