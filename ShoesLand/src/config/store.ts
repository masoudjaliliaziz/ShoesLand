import { configureStore } from "@reduxjs/toolkit";
import { authSlice, discountSlice } from "./slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    discount: discountSlice.reducer,
  },
});
