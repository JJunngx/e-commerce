import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  productsRedux: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const listProduct = JSON.parse(localStorage.getItem("cart")) || [];

      state.productsRedux = listProduct;

      const existProduct = state.productsRedux.find(
        (product) => product._id.$oid === action.payload._id.$oid
      );

      if (existProduct) {
        existProduct.number += action.payload.number;
      } else {
        state.productsRedux = [...state.productsRedux, action.payload];
      }

      localStorage.setItem("cart", JSON.stringify(state.productsRedux));
    },

    reduceOneProduct: (state, action) => {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
