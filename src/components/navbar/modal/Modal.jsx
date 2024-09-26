import React, { useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import { GallaryIcon } from "../../../assets/svg/GallaryIcon";
import CropModal from "./CropModal";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logeddInUser } from "../../../features/slice/loginSlice/loginSlice";

const Modal = ({ setShow }) => {
  const userUid = useSelector((state) => state.login.user);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  let [photoLoader, setPhotoLoader] = useState(false);
  const cropperRef = useRef();
  let choeseRef = useRef(null);
  const storage = getStorage();
  const storageRef = ref(storage, userUid.uid);
  const auth = getAuth();
  let dispatch = useDispatch();

  let handleChange = (e) => {
    e.preventDefault();
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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      setPhotoLoader(true);
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              dispatch(logeddInUser({ ...userUid, photoURL: downloadURL }));
              localStorage.setItem(
                "users",
                JSON.stringify({ ...userUid, photoURL: downloadURL })
              );
              setPhotoLoader(false);
              setShow(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
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
            getCropData={getCropData}
            photoLoader={photoLoader}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
