import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access_token: localStorage.getItem("access_token"),
        user: null,
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: "",
        errorMsg: "",
        isAuthenticated: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            
        },
    },
});



export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
