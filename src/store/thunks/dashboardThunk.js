import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "./../axiosConfig";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const fetchDashboardData = createAsyncThunk(
    'taskCounts/fetchTaskCounts',
    async (_, thunkAPI) => {
        try {
            const response = await APIS.get(`/task/weekly/counts`, {
                headers: {
                    'Content-Type': 'application/json',
                    access_token: `Bearer ${localStorage.getItem('access_token')}`,
                    'timezone': userTimeZone,
                },
            });
            console.log('Response:', response);
            return response.data; // Assuming the response data contains the task counts
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue({
                statusCode: error.response.status,
                message: error.response.data.error,
            });
        }
    }
);