import { createAsyncThunk } from "@reduxjs/toolkit";
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import { HandleAuthError } from '../../utils/AuthErrorHandler.js';
import { APIS } from "../axiosConfig";

const getAllNotesThunk = createAsyncThunk("getAllNotes", async (params, thunkAPI) => {
    console.log("inside getAllNotes thunk",);
    const { page, limit, search, pinned } = params
    console.log('...................', page, limit, search, pinned)
    const privateKey = localStorage.getItem("privateKey");
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
        response?.data?.data.forEach(note => {
            note.date = new Date(note?.createdAt),
                note.title = decryptSingleValues(note?.title, privateKey);
            note.desc = decryptSingleValues(note?.desc, privateKey);
            if (Array.isArray(note?.desc)) {
                note.desc = note?.desc.join('');
                }

        });
        console.log('After decryption in getAllNotesThunk, response.data.data is', response.data.data)
        return {
            data: response.data.data,
            metaData: response.data.metaData,
        };
    } catch (error) {
        if (!error.response) {
            console.log('Error is in the getAllNotesThunk++++++++++++++++++++++++++++', error)
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});

const createNoteThunk = createAsyncThunk("createNote", async (body, thunkAPI) => {
    console.log("inside createNote thunk", body);
    try {
        const response = await APIS.post(`/notes`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is,", response);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});

const updateNoteThunk = createAsyncThunk("updateNote", async (body, thunkAPI) => {
    console.log("inside update-note thunk", body);
    const { _id } = body;
    console.log('its sthe thunk ', body)
    try {
        const response = await APIS.put(`/notes/${_id}`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response in update-note-thunk is,", response);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});

const changePinnedStatus = createAsyncThunk("changePinned", async (params, thunkAPI) => {
    console.log("inside change-pinned thunk",);
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

export { changePinnedStatus, createNoteThunk, deleteNoteThunk, getAllNotesThunk, updateNoteThunk };

