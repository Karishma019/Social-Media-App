import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = createAsyncThunk("auth/signin", async (formData) => {
  const response = await API.post("/auth/signin", formData);
  //   localStorage.setItem("profile", JSON.stringify(response.data));

  return response.data;
});

export const signUp = createAsyncThunk("auth/signup", async (formData) => {
  console.log(formData);
  const response = await API.post("/auth/signup", formData);
  console.log(response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const authReducer = authSlice.reducer;
