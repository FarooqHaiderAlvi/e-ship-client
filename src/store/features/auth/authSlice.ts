import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser, fetchLoggedInUser } from "./authThunk";

// Define user shape
interface User {
  _id: string;
  email: string;
  name: string;
  [key: string]: any; // Optional extra fields
}

// Define auth state
interface AuthState {
  user: User | null;
  isLoadingUser: boolean;
  error: string | null | unknown;
}

const initialState: AuthState = {
  user: null,
  isLoadingUser: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoadingUser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoadingUser = false;
        console.log("Login payload:", action.payload?.data?.user);
        state.user = action.payload?.data?.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })

      // 🔹 Signup User
      .addCase(signupUser.pending, (state) => {
        // state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoadingUser = false;
        state.user = action.payload?.user || action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })

      // 🔹 Fetch Logged In User
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(
        fetchLoggedInUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoadingUser = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchLoggedInUser.rejected, (state) => {
        state.isLoadingUser = false;
        state.user = null; // Clear user on failure
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
