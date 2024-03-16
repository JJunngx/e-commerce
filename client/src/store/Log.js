import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../hook/Storage";
const user = getFromStorage("isLogged");
const logSlice = createSlice({
  name: "log",
  initialState: {
    isLogged: false,
    user: user || {},
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogged = false;
      state.user = {};
    },
  },
});
export const logActions = logSlice.actions;
export default logSlice.reducer;
