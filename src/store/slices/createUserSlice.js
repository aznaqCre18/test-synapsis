import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialStateCreateUser = {
    isError: false,
    isLoading: false,
}

export const createUser = createAsyncThunk("createUser", async (payload) => {
    const options = {
        method: 'POST',
        url: SERVICES.GET_USERS,
        headers: {
            Authorization: SERVICES.TOKEN
        },
        data: payload
    }

    try {
        const response = await fetch(options);
        toast.success("Success create user", {
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
        toast.error("Failed create user", {
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

const createUserSlice = createSlice({
    name: "createUser",
    initialState: initialStateCreateUser,
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;

            toast.error("Failed create user", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }
})

export default createUserSlice.reducer;