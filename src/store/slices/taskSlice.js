import { createSlice } from '@reduxjs/toolkit';
import { fetchCalendarTasksThunk } from '../thunks/taskThunks';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarTasksThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCalendarTasksThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
                console.info('payload in sllice', action.payload)
            })
            .addCase(fetchCalendarTasksThunk.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default tasksSlice.reducer;
