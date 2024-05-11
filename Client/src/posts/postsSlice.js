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

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/posts");
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const createPost = createAsyncThunk("posts/add", async (post) => {
  try {
    const response = await API.post("/posts", {
      ...post,
    });
    return response.data;
  } catch (error) {
    return error;
    // return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, post }, thunkAPI) => {
    try {
      const response = await API.patch(`/posts/${id}`, {
        post,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const response = await API.delete(`/posts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const response = await API.patch(`/posts/${id}/likes`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const commentPost = createAsyncThunk(
  "posts/comments",
  async ({ id, comment }, thunkAPI) => {
    try {
      const response = await API.post(`/posts/${id}/comments`, {
        comment,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    error: null,
    data: [],
  },
  extraReducers: (builders) => {
    builders.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builders.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload;
    });
    builders.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });

    builders.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
      state.error = action.error;
    });
    builders.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((post) => post._id !== action.payload);
    });

    builders.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builders.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });

    builders.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builders.addCase(likePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });

    builders.addCase(likePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builders.addCase(commentPost.pending, (state, action) => {
      state.isLoading = true;
    });

    builders.addCase(commentPost.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.data = state.data.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });

    builders.addCase(commentPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
