import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("silpasathiToken");
      state.user = null;
    },
    login(state, action) {
      // state e previous data and action e user data
      const user = action.payload;

      state.user = {
        uid: user.uid,
        username: user.username,
        rid: user.rid,
        role: user.role,
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        mobile: user.mobile,
        email: user.email,
        token: user.token,
      };
    },
    profile(state, action) {
      const user = action.payload;
      state.user = {
        uid: user.uid,
        username: user.username,
        rid: user.rid,
        role: user.role,
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        mobile: user.mobile,
        email: user.email,
        access: user.access,
        token: user.token || localStorage.getItem("silpasathiToken"),
      };
    },
    //handle multiple tab , user states
    refresh(state) {
      const token = localStorage.getItem("silpasathiToken");

      // token = null and user data is present : logged out from another tab
      //state.user.token != token from localStorage : logged out from different tab and then logged in, hence
      //  token mismatch between state and local
      if ((!token && state.user) || state.user?.token != token) {
        state.user = null;
      }
    },
  },
});

export const { logout, login, profile, refresh } = userSlice.actions;

export default userSlice.reducer;
