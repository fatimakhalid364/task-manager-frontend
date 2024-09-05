import { createAsyncThunk } from "@reduxjs/toolkit";
import { HandleAuthError } from '../../utils/AuthErrorHandler.js';
import { APIS } from "../axiosConfig";

const getAllTasksThunk = createAsyncThunk("getAllTasks", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { page, limit, search } = params
    try {
        const response = await APIS.get(`/task`, {
            params: {
                page, limit, search
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

const deleteTaskThunk = createAsyncThunk("changePinned", async (_id, thunkAPI) => {
    console.log("inside delete tasks thunk");
    try {
        const response = await APIS.delete(`/task/${_id}`, {
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

const fetchCalendarTasksThunk = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ view, startDate, endDate }, thunkAPI) => {
        console.log("inside fetchCalendarTasksThunk", view, startDate, endDate);

        try {
            // Fetch tasks from the API with the view and date as query parameters
            const response = await APIS.get('/task/calendar', {
                params: { view, startDate, endDate },
                headers: {
                    "Content-Type": "application/json",
                    access_token: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log("response is in thunk:", response);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return HandleAuthError(error, thunkAPI);
        }
    }
);
export { deleteTaskThunk, fetchCalendarTasksThunk, getAllTasksThunk };

