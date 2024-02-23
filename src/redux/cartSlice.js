import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  quantity: 0,
  total: 0,
  shippingCost: 30000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const check = state.products?.findIndex(
        (product) =>
          product._id === action.payload._id &&
          product.colorName === action.payload.colorName &&
          product.size === action.payload.size
      );

      if (check === -1) {
        state.products = [...state.products, action.payload];
      } else {
        state.products[check].quantity += action.payload.quantity;
      }

      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
      state.shippingCost = state.total > 300000 ? 0 : 30000;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateProduct(state, action) {
      console.log(action.payload);
      state.products.at(
        state.products.findIndex(
          (product) =>
            product._id === action.payload._id &&
            product.color.colorName === action.payload.color.colorName &&
            product.size === action.payload.size
        )
      ).quantity = action.payload.quantity;
      state.quantity = state.products.reduce((q, p) => q + p.quantity, 0);
      state.total = state.products.reduce(
        (newPrice, p) => newPrice + p.price * p.quantity,
        0
      );
      state.shippingCost = state.total > 300000 ? 0 : 30000;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteProduct(state, action) {
      state.products.splice(
        state.products.findIndex((product) => product._id === action.payload),
        1
      );
      state.quantity = state.products.reduce((q, p) => q + p.quantity, 0);
      state.total = state.products.reduce(
        (newPrice, p) => newPrice + p.price * p.quantity,
        0
      );
      state.shippingCost = state.total > 300000 ? 0 : 30000;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart(state) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.shippingCost = state.total > 300000 ? 0 : 30000;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, updateProduct, deleteProduct, resetCart } =
  cartSlice.actions;
