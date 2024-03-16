import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: { popup: false },
  reducers: {
    onPopup(state) {
      state.popup = true;
    },
    offPopup(state) {
      state.popup = false;
    },
  },
});
export const popupActions = popupSlice.actions;
export default popupSlice.reducer;
