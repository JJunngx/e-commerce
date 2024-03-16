import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    totalPrice: "",
    totalProduct: [],
  },
  reducers: {
    yourOrder: (state, action) => {
      state.totalProduct = action.payload.totalProduct;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
