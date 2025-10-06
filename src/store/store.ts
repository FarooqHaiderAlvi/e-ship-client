import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

// ✅ Create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Inferred types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
