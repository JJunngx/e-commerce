import { createSlice } from "@reduxjs/toolkit";

const smartDevice = createSlice({
  name: "smartdevice",
  initialState: {
    device: "",
  },
  reducers: {
    setDataProduct(state, action) {
      state.device = action.payload;
    },
  },
});
export const deviceActions = smartDevice.actions;
export default smartDevice.reducer;
