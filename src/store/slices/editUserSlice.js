import { SERVICES } from "@/config/services";
import fetch from "@/utils/fetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialStateEditUser = {
    isError: false,
    isLoading: false,
}

export const editUser = createAsyncThunk("editUser", async (data) => {
    console.log(data);

    const payload = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        status: data.status
    }

    const options = {
        method: 'PUT',
        url: `${SERVICES.GET_USERS}/${data.id}`,
        headers: {
            Authorization: SERVICES.TOKEN
        },
        data: payload
    }

    try {
        const response = await fetch(options);
        toast.success("Success edit user", {
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
        toast.error("Failed edit user", {
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

const editUserSlice = createSlice({
    name: "editUser",
    initialState: initialStateEditUser,
    extraReducers: (builder) => {
        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default editUserSlice.reducer;