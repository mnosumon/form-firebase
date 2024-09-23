import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("users")) || null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logeddInUser: (state, actions) => {
      state.user = actions.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { logeddInUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
