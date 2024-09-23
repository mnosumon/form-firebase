import React, { useState } from "react";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { loginWarning } from "../../warning/loginWarning/loginWarning";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logeddInUser } from "../../features/slice/loginSlice/loginSlice";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

let initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  let [loader, setLoader] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: loginWarning,
    onSubmit: () => {
      loginUser();
    },
  });
  let loginUser = () => {
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password,
      setLoader(true)
    )
      .then((userItem) => {
        if (userItem.user.emailVerified === true) {
          toast.success("Sign in successfull", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch(logeddInUser(userItem.user));
          localStorage.setItem("users", JSON.stringify(userItem.user));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.warn("Your email is not verified", {
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
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("password or email incorrect", {
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
        setLoader(false);
      });
  };
  let { errors, touched } = formik;

  let handlePsswordShow = () => {
    if (!passwordShow) {
      setPasswordShow(true);
    } else {
      setPasswordShow(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-4xl font-bold mb-5 text-orange-500">Login form</h2>
      <form onSubmit={formik.handleSubmit}>
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

        <div
          className={`${
            errors.password && touched.password ? "mb-1" : "mb-3"
          } `}
        >
          <div className="relative">
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="off"
              name="password"
              type={passwordShow ? "text" : "password"}
              className="w-full px-5 py-2 outline-none border border-sky-800 rounded-md text-lg font-sans"
              placeholder="Enter your password"
            />
            <div
              onClick={handlePsswordShow}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {passwordShow ? <FaRegEyeSlash /> : <IoEyeOutline />}
            </div>
          </div>
        </div>
        {errors.password && touched.password && (
          <div className="text-sm  mb-3 text-red-500">{errors.password}</div>
        )}

        <button
          disabled={loader}
          type="submit"
          className="text-white text-lg rounded-md bg-orange-600 px-7 py-3 w-full mt-3"
        >
          {loader ? <BeatLoader color="#fff" /> : "login"}
        </button>
      </form>
      <div className="mt-5">
        <p className="text-xl">
          You have no account, please{" "}
          <Link to="/registration" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
