import { createAsyncThunk } from "@reduxjs/toolkit";
import { HandleAuthError } from '../../utils/AuthErrorHandler.js';
import { APIS } from "../axiosConfig";

const getAllNotesThunk = createAsyncThunk("getAllNotes", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { page, limit, search, pinned } = params
    try {
        const response = await APIS.get(`/notes`, {
            params: {
                page, limit, search, pinned
            },
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is in thunk,====================>", response);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});

export { getAllNotesThunk };

