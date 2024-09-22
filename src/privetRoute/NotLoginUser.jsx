import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoginUser() {
  const users = useSelector((state) => state.login.user);
  return users ? <Navigate to="/" /> : <Outlet />;
}
