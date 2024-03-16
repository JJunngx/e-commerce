import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./PopupProduct";
import logReducer from "./Log";
import deviceReducer from "./SmartDevice";
import cartReducer from "./Cart";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    log: logReducer,
    device: deviceReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
