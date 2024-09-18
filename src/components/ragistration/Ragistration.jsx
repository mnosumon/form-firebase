import React, { useState } from "react";
import { useFormik } from "formik";
import { registrationWarning } from "../registrationWarning/RegistrationWarning";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

let initialState = {
  fullName: "",
  email: "",
  password: "",
  bDate: new Date().getDate(),
  bMonth: new Date().getMonth() + 1,
  bYear: new Date().getFullYear(),
  gender: "",
};

const Ragistration = () => {
  let [ageValidation, setAgeValidation] = useState("");
  let [loader, setLoader] = useState(false);
  const auth = getAuth();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: registrationWarning,
    onSubmit: () => {
      ageValidate();
      authentication();
    },
  });
  let authentication = () => {
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password,
      setLoader(true)
    )
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.success("Confirm your email varification", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setLoader(false);
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      })
      .catch((error) => {
        setLoader(false);
        if (error.message.includes("auth/email-already-in-use")) {
          toast.warn("This email already used", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  let ageValidate = () => {
    let currentDate = new Date();
    let pickedDate = new Date(
      formik.values.bYear,
      formik.values.bMonth - 1,
      formik.values.bDate
    );
    let adult = new Date(1970 + 18, 0, 1);
    let oldMan = new Date(1970 + 70, 0, 1);
    if (currentDate - pickedDate < adult) {
      return setAgeValidation("You are not 18+");
    } else if (currentDate - pickedDate > oldMan) {
      return setAgeValidation("You are also 70+");
    } else {
      return setAgeValidation("");
    }
  };
  let storeYear = new Date().getFullYear();

  let days = () => {
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate();
  };
  let day = Array.from(new Array(days()), (val, index) => 1 + index);

  let month = Array.from(new Array(12), (val, index) => 1 + index);
  let years = Array.from(new Array(105), (val, index) => storeYear - index);

  let { errors, touched } = formik;

  return (
    <>
      <ToastContainer />
      <h2 className="text-4xl font-bold mb-5 text-orange-500">
        Ragistration form
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.fullName}
          autoComplete="off"
          name="fullName"
          type="text"
          className="w-full px-5 py-2 outline-none border border-sky-800 rounded-md 
             text-lg font-sans mb-3"
          placeholder="Enter your name"
        />
        {errors.fullName && touched.fullName && (
          <div className="text-sm  mb-3 text-red-500">{errors.fullName}</div>
        )}

        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          autoComplete="off"
          name="email"
          type="email"
          className="w-full px-5 py-2 outline-none border border-sky-800 rounded-md 
             text-lg font-sans mb-3"
          placeholder="Enter your email"
        />
        {errors.email && touched.email && (
          <div className="text-sm  mb-3 text-red-500">{errors.email}</div>
        )}
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          autoComplete="off"
          name="password"
          type="password"
          className="w-full px-5 py-2 outline-none border border-sky-800 rounded-md 
             text-lg font-sans mb-3"
          placeholder="Enter your password"
        />
        {errors.password && touched.password && (
          <div className="text-sm  mb-3 text-red-500">{errors.password}</div>
        )}

        <div className="">
          <h3 className="text-xl">Select your birth date</h3>
          <div className="flex justify-between items-center my-3">
            <select
              onChange={formik.handleChange}
              value={formik.values.bDate}
              name="bDate"
              className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
            >
              {day.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            <select
              onChange={formik.handleChange}
              value={formik.values.bMonth}
              name="bMonth"
              className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
            >
              {month.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            <select
              onChange={formik.handleChange}
              value={formik.values.bYear}
              name="bYear"
              className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
            >
              {years.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          {ageValidation && (
            <div className="text-sm  mb-3 text-red-500">{ageValidation}</div>
          )}
        </div>
        <div className="">
          <h3 className="text-xl mt-3">Select your gender</h3>
          <div className="flex w-2/3 justify-between items-center my-3">
            <div className="flex gap-5 items-center ">
              <label htmlFor="male">Male</label>
              <input
                onChange={formik.handleChange}
                value="male"
                type="radio"
                name="gender"
                id="male"
                className="py-3 px-6 w-full font-gilroyRegular focus:outline-none border border-lineColor rounded-md"
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="female">Female</label>
              <input
                onChange={formik.handleChange}
                value="female"
                type="radio"
                name="gender"
                id="female"
                className="py-3 px-6 w-full font-gilroyRegular focus:outline-none border border-lineColor rounded-md"
              />
            </div>
          </div>
          {errors.gender && touched.gender && (
            <div className="text-sm  mb-3 text-red-500">{errors.gender}</div>
          )}
        </div>
        <button
          disabled={loader}
          type="submit"
          className="text-white text-lg rounded-md bg-orange-600 px-7 py-3 w-full mt-3"
        >
          {loader ? <BeatLoader color="#fff" /> : "Sign up"}
        </button>
      </form>
    </>
  );
};

export default Ragistration;
