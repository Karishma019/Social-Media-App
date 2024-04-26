import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/postsSlice";
import { authReducer } from "./auth/authSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
