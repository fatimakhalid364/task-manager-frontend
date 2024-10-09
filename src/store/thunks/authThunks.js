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
    console.log("inside signin thunk", body);
    try {
        const response = await APIS.post(`/auth/signin`, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
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

const fetchKeyThunk = createAsyncThunk("auth/fetchKey", async (body, thunkAPI) => {
    try {
        const response = await APIS.get(`/auth/fetchKey`, {
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

const forgotPassThunk = createAsyncThunk('auth/forgot-password', async (body, thunkAPI) => {
    console.log('inside forgotpass thunk', body);
    try{
        const response = await APIS.post(`/auth/forgot-password`, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
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
    
});
const verificationEmailThunk = createAsyncThunk("auth/verificationThunk", async (token, thunkAPI) => {
    console.log("inside verify-email thunk", token);
    const body = {};
    try {
        const response = await APIS.post(`/auth/verify-email/${token}`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is,", response);
        return response.data;
    } catch (error) {
        console.log('Error inside the thunk', error);
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});

const resetVerificationEmailThunk = createAsyncThunk("auth/verificationThunk", async (token, thunkAPI) => {
    console.log("inside verify-email thunk", token);
    const body = {};
    try {
        const response = await APIS.post(`/auth/reset-password-verification/${token}`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is,", response);
        return response.data;
    } catch (error) {
        console.log('Error inside the thunk', error);
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});

const resetPassThunk = createAsyncThunk("auth/resetPassThunk", async (body, thunkAPI) => {
    console.log("inside resetPassThunk ", body);
    try {
        const response = await APIS.post(`/auth/reset-password`, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
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
const updatePasswordThunk = createAsyncThunk("auth/updatePasswordThunk", async (body, thunkAPI) => {
    console.log("inside verify-email thunk", body);
    try {
        const response = await APIS.put(`/auth/password/update`, body, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is,", response);
        return response.data;
    } catch (error) {
        console.log('Error inside the thunk', error);
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});
export { fetchKeyThunk, forgotPassThunk, resetPassThunk, resetVerificationEmailThunk, signinThunk, signupThunk, updatePasswordThunk, verificationEmailThunk };

