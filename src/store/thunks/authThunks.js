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
const signinThunk = createAsyncThunk("auth/signin", async (body, thunkAPI) => {
    console.log("inside signup thunk", body);
    try {
        const response = await APIS.post(`/auth/signin`, body, {
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

const forgotPassThunk = createAsyncThunk('auth/forgotpass', async (body, thunkAPI) => {
    console.log('inside forgotpass thunk');
    try{
        const response = await APIS.post(`/auth/forgotpass`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is,", response);
        return response.data;
    }catch(error){
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
    
})


export { signinThunk, signupThunk, forgotPassThunk };

