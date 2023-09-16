import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateDetail = {
    detailPost: null,
    isError: false,
    isLoading: false,
}

export const fetchPostsDetail = createAsyncThunk("fetchPostsDetail", async (id) => {
    console.log(id, "IDDD");
    const options = {
        method: 'GET',
        url: `${SERVICES.GET_POST}/${String(id)}`,
    }

    const response = await fetch(options);
    return response;
});

const postsDetailSlice = createSlice({
    name: "postsDetail",
    initialState: initialStateDetail,
    extraReducers: (builder) => {
        builder.addCase(fetchPostsDetail.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchPostsDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.detailPost = action.payload;
        })
        builder.addCase(fetchPostsDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default postsDetailSlice.reducer;