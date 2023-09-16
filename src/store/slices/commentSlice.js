import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateComment = {
    detailPostComments: null,
    isError: false,
    isLoading: false,
}

export const fetchPostsComments = createAsyncThunk("fetchPostsComments", async (id) => {
    const options = {
        method: 'GET',
        url: `${SERVICES.GET_POST}/${String(id)}/comments`,
    }

    const response = await fetch(options);
    return response;
});

const postsDetailCommentSlice = createSlice({
    name: "postsDetailComments",
    initialState: initialStateComment,
    extraReducers: (builder) => {
        builder.addCase(fetchPostsComments.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchPostsComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.detailPostComments = action.payload;
        })
        builder.addCase(fetchPostsComments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default postsDetailCommentSlice.reducer;