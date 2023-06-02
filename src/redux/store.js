import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "./api/contactApi";
import authSlice from "./services/authSlice";
import contactSlice from "./services/contactSlice";

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    authSlice: authSlice,
    contactSlice: contactSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});
