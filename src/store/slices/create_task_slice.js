import { createSlice } from '@reduxjs/toolkit';
import createTaskThunk from 'src/store/thunks/create_task_thunk';


const createTaskSlice = createSlice({
    name: 'createTask',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        taskDetails: null,
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: '',
        errorMsg: '',
        isAuthenticated: true,
    },
    reducers: {
        setTaskDetails: (state, action) => {
            state.taskDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup Thunk
            .addCase(createTaskThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'task details posted and retrieved successful!ly';
                state.errorMsg = '';
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Error occured while posting and retrieving task details!';
            })
            
    },
});

export const { setTaskDetails } = createTaskSlice.actions;

export const createTaskReducer = createTaskSlice.reducer;
