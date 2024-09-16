import React from "react";
import { useFormik } from "formik";
import { registrationWarning } from "../registrationWarning/RegistrationWarning";

let initialState = {
  fullName: "",
  email: "",
  password: "",
};
const Ragistration = () => {
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: registrationWarning,
    onSubmit: () => {
      console.log("submited");
    },
  });
  console.log(formik.errors.email);

  let { errors, touched } = formik;

  return (
    <div className="flex justify-between w-1/2 mx-auto p-8 shadow-md rounded-md">
      <div className="w-[48%]"></div>
      <div className="w-[48%]">
        <h2 className="text-4xl font-bold mb-5 text-orange-500">
          Ragistration form
        </h2>
        <form onSubmit={formik.handleSubmit} action="">
          <input
            onChange={formik.handleChange}
            value={formik.values.fullName}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="fullName"
            type="text"
            className={`w-full px-5 py-2 outline-none border border-sky-800 rounded-md ${
              errors.fullName && touched.fullName ? "mb-1" : "mb-3"
            } text-lg font-sans`}
            placeholder="Enter your name"
          />
          {errors.fullName && touched.fullName && (
            <div className="text-sm  py-2 text-red-500">{errors.fullName}</div>
          )}

          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            className={`w-full px-5 py-2 outline-none border border-sky-800 rounded-md ${
              errors.email && touched.email ? "mb-1" : "mb-3"
            } text-lg font-sans`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-sm  py-2 text-red-500">{errors.email}</div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="password"
            type="password"
            className={`w-full px-5 py-2 outline-none border border-sky-800 rounded-md ${
              errors.password && touched.password ? "mb-1" : "mb-3"
            } text-lg font-sans`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-sm  py-2 text-red-500">{errors.password}</div>
          )}

          <div className="">
            <h3 className="text-xl">Select your birth date</h3>
            <div className="flex justify-between items-center my-3">
              <select
                name="date"
                className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
              >
                <option value="">8</option>
              </select>
              <select
                name="month"
                className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
              >
                <option value="">8</option>
              </select>
              <select
                name="year"
                className="border border-yellow-500 rounded-md  w-[30%] outline-none p-2 appearence-none"
              >
                <option value="">8</option>
              </select>
            </div>
          </div>
          <div className="">
            <h3 className="text-xl">Select your gender</h3>
          </div>
          <button
            type="submit"
            className="text-white text-lg rounded-md bg-orange-600 px-7 py-3 w-full mt-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ragistration;
