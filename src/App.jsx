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
import RootLayout from "./rootLayout/RootLayout";
import Message from "./pages/message/Message";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
          </Route>
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
