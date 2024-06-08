import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "./../axiosConfig";

const signupThunk = createAsyncThunk("auth/signup", async (body, thunkAPI) => {
    console.log("inside signup thunk", body);
    try {
        const response = await APIS.post(`/auth/signup`, body, {
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


export { signupThunk };

