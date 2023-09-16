import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateUsers = {
    dataUsers: null,
    isError: false,
    isLoading: false,
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const options = {
        method: 'GET',
        url: `${SERVICES.GET_USERS}?page=1&per_page=100`,
    }

    const response = await fetch(options);
    return response;
});

const usersSlice = createSlice({
    name: "users",
    initialState: initialStateUsers,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataUsers = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default usersSlice.reducer;