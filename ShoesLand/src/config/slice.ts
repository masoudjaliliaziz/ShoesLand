import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
}

export interface DiscountState {
  value: string | null;
}

interface CheckoutState {
  finalTotal: number | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export const discountSlice = createSlice({
  name: "discount",
  initialState: {
    value: localStorage.getItem("discount") || null,
  },
  reducers: {
    setDiscount: (state, action: PayloadAction<string | null>) => {
      console.log("discount", action.payload);
      state.value = action.payload;
      if (action.payload) {
        localStorage.setItem("discount", action.payload);
      } else {
        localStorage.removeItem("discount");
      }
    },
    clearDiscount: (state) => {
      state.value = null;
      localStorage.removeItem("discount");
    },
  },
});

export const selectDiscount = (state) => state.discount.value;
export const { setDiscount, clearDiscount } = discountSlice.actions;

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    finalTotal: null,
  },
  reducers: {
    setFinalTotal: (state, action: PayloadAction<number>) => {
      state.finalTotal = action.payload;
    },
  },
});

export const { setFinalTotal } = checkoutSlice.actions;
export const selectFinalTotal = (state: { checkout: CheckoutState }) => state.checkout.finalTotal;

