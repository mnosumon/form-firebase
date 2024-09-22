import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../animation/loginAnimation.json";
import LoginForm from "../../components/login/loginForm";

const Login = () => {
  return (
    <div className="flex justify-between items-center w-2/3 mx-auto p-8 shadow-md rounded-md">
      <div className="w-[48%]">
        <Lottie animationData={LoginAnimation} loop={true} />;
      </div>
      <div className="w-[48%]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
