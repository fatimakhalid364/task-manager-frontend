import { createSlice } from '@reduxjs/toolkit';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';



const getAllTasksSlice = createSlice({
    name: 'getAllTasks',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        allTasks: null,
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: '',
        errorMsg: '',
    },
    reducers: {
        setAllTasks: (state, action) => {
            state.allTasks = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // Signup Thunk
            .addCase(getAllTasksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'task details retrieved successful!ly';
                state.errorMsg = '';
                console.log('Fulfilled: action.payload =', state.allTasks);
            })
            .addCase(getAllTasksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Error occured while retrieving task details!';
            })
            
    },
});



export const { setGetAllTasks } = getAllTasksSlice.actions;

export const getAllTasksReducer = getAllTasksSlice.reducer;
