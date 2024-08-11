import { createAsyncThunk } from "@reduxjs/toolkit";
import { HandleAuthError } from '../../utils/AuthErrorHandler.js';
import { APIS } from "../axiosConfig";

const getAllNotesThunk = createAsyncThunk("getAllNotes", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { page, limit, search, pinned } = params
    console.log('...................', page, limit, search, pinned)
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

const changePinnedStatus = createAsyncThunk("changePinned", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { _id, pinned } = params
    console.log('...................', _id, pinned)
    try {
        const response = await APIS.put(`/notes/${_id}/${pinned}`, {}, {
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

const deleteNoteThunk = createAsyncThunk("changePinned", async (_id, thunkAPI) => {
    console.log("inside delete note thunk");
    try {
        const response = await APIS.delete(`/notes/${_id}`, {
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

export { changePinnedStatus, deleteNoteThunk, getAllNotesThunk };

