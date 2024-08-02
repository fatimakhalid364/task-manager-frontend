import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../axiosConfig";

const getAllTasksThunk = createAsyncThunk("getAllTasks", async (_, thunkAPI) => {
    console.log("inside getAllTasks thunk",);

    try {
        const response = await APIS.get(`/task`, {
            params: {
                search: ""
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
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});

export { getAllTasksThunk };

