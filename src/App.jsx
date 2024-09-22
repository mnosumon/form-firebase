import React from "react";
import "react-toastify/dist/ReactToastify.css";
import RegistretionForm from "./pages/registration/RegistretionForm";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import LoginUser from "./privetRoute/LoginUser";
import NotLoginUser from "./privetRoute/NotLoginUser";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoginUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistretionForm />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
