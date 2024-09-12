import { createSlice } from '@reduxjs/toolkit';
import { getAllTasksThunk } from '../thunks/taskThunks';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        metaData: {},
        loading: false,
    },
    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
            state.metaData = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.tasks = action.payload.data; // Store tasks in Redux
                state.metaData = action.payload.metaData; // Store meta data in Redux
                state.loading = false;
            })
            .addCase(getAllTasksThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { clearTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
