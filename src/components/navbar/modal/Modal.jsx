import React, { useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import { GallaryIcon } from "../../../assets/svg/GallaryIcon";
import CropModal from "./CropModal";
import "cropperjs/dist/cropper.css";

const Modal = ({ setShow }) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef();
  let choeseRef = useRef(null);

  let handleChange = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

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
            <input ref={choeseRef} type="file" hidden onChange={handleChange} />
          </div>
        </div>
        {image && (
          <CropModal
            setImage={setImage}
            cropperRef={cropperRef}
            image={image}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
