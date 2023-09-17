import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialStateDeleteUser = {
    isError: false,
    isLoading: false,
}

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const options = {
        method: 'DELETE',
        url: `${SERVICES.GET_USERS}/${id}`,
        headers: {
            Authorization: SERVICES.TOKEN
        },
    }

    try {
        const response = await fetch(options);
        toast.success("Success delete user", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

        return response;
    } catch (error) {
        toast.error("Failed delete user", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

        return error;
    }
});

const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState: initialStateDeleteUser,
    extraReducers: (builder) => {
        builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default deleteUserSlice.reducer;