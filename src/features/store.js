import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice/loginSlice";
import activeSingleSlice from "./slice/activeSingleSlice/activeSingleSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    single: activeSingleSlice,
  },
});
