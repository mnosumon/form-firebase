import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("single")) || null,
};

export const activeSingleSlice = createSlice({
  name: "single",
  initialState,
  reducers: {
    singleFriend: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { singleFriend } = activeSingleSlice.actions;

export default activeSingleSlice.reducer;
