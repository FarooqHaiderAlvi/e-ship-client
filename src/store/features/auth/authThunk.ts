import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";
import { AxiosError } from "axios";

// Define expected form data types
interface LoginFormData {
  name: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface ForgotPassData {
  email: string;
}

// Define expected API response types (you can adjust based on backend)
interface AuthResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

// Define error response structure
interface ErrorResponse {
  message: string;
}

// 🔹 Login User
export const loginUser = createAsyncThunk<AuthResponse, LoginFormData>(
  "users/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/users/login",
        formData
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// 🔹 Signup User
export const signupUser = createAsyncThunk<AuthResponse, SignupFormData>(
  "users/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/users/register",
        formData
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// 🔹 Fetch Logged In User
export const fetchLoggedInUser = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get<{ data: AuthResponse["user"] }>(
        "/users/get-user",
      );
      return data.data;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);


export const forgotPassword = createAsyncThunk<AuthResponse,ForgotPassData>("user/forgotPassword",
  async (formData,thunkAPI)=>{
  try{
    const { data } = await axiosInstance.post<AuthResponse>(
      "/users/forgot-password",
      formData
    );
    console.log(data);
    return data;
  }catch{
    return thunkAPI.rejectWithValue("500 internal server error.")
  }
})