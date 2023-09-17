import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SERVICES } from '@/config/services';
import fetch from '@/utils/fetch';

const initialState = {
  postsList: [],
  isError: false,
  isLoading: false,
}

export const fetchPosts = createAsyncThunk("fetchPosts", async (page) => {
    const options = {
        method: 'GET',
        url: `${SERVICES.GET_POST}?page=${page}&per_page=10`,
    }

    const response = await fetch(options);
    return response;
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postsList = action.payload;
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default postsSlice.reducer;