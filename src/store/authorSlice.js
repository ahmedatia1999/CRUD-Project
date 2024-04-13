import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, name: "ahmed" },
  reducers: {
    loginOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { loginOut } = authSlice.actions;

export default authSlice.reducer;
