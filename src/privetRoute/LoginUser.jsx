import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login/Login";

export default function LoginUser() {
  const users = useSelector((state) => state.login.user);
  return users ? <Outlet /> : <Login />;
}
