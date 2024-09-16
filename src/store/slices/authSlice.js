import { createSlice } from '@reduxjs/toolkit';
import { fetchKeyThunk, forgotPassThunk, signinThunk, signupThunk } from 'src/store/thunks/authThunks';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        user: null,
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: '',
        errorMsg: '',
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup Thunk
            .addCase(signupThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'Signup successful!';
                state.errorMsg = '';
                console.log('Fulfilled for user: action.payload =', state.user);
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Signup failed!';
            })
            .addCase(signinThunk.fulfilled, (state, action) => {
                console.log('Iam in the signin in thunk slice', action)
                state.isLoading = false;
                state.successMsg = 'Signin successful!';
                state.errorMsg = '';
                state.access_token = action.payload.data.access_token;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
            })
            .addCase(signinThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Signin failed!';
            })
            // Forgot Password Thunk
            .addCase(forgotPassThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(forgotPassThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'Password reset successful!';
                state.errorMsg = '';
            })
            .addCase(forgotPassThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Password reset failed!';
            })
            // Fetch Key Thunk
            .addCase(fetchKeyThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(fetchKeyThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'Key fetched successfully!';
                state.errorMsg = '';
            })
            .addCase(fetchKeyThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Key fetch failed!';
            });
    },
});

export const { setUser } = authSlice.actions;
export const { logout } = authSlice.actions;


export const authReducer = authSlice.reducer;
