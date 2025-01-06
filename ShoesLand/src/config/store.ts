import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import { persistReducer, persistStore } from "redux-persist";
import { authSlice, discountSlice } from "./slice";

const authPersistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    discount: discountSlice.reducer,
  },
});

// Create a persistor to manage persisting the store wtf :>|
export const persistor = persistStore(store);

