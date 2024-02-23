import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import toastReducer from "./toastSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    toast: toastReducer,
  },
});

export default store;
