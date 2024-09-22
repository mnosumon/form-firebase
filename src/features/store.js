import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
