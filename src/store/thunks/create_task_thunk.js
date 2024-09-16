import { createAsyncThunk } from "@reduxjs/toolkit";
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import { APIS } from "../axiosConfig";

const createTaskThunk = createAsyncThunk("createTask", async (body, thunkAPI) => {
    console.log("inside createTask thunk", body);
    const privateKey = localStorage.getItem("privateKey");

    try {
        const response = await APIS.post(`/task/create`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        response.data.data.taskTitle = decryptSingleValues(response?.data?.data?.taskTitle, privateKey);
        response.data.data.taskDescription = decryptSingleValues(response?.data?.data?.taskDescription, privateKey);

        if (Array.isArray(response.data.data.taskDescription)) {
            response.data.data.taskDescription = response.data.data.taskDescription.join('');
        }

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

export default createTaskThunk;