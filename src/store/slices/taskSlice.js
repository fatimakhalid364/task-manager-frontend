import { createSlice } from '@reduxjs/toolkit';
import createTaskThunk from 'src/store/thunks/create_task_thunk';
import { getAllTasksThunk } from '../thunks/taskThunks';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        metaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
            state.metaData = {};
        },
        addTask: (state, action) => {
            state.tasks = [action.payload, ...state.tasks];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.tasks.push(action.payload.data);
            })
            .addCase(getAllTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.tasks = action.payload.data; // Store tasks in Redux
                state.metaData = action.payload.metaData; // Store meta data in Redux
                state.loading = false;
                state.loaded = true;
            })
            .addCase(getAllTasksThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { clearTasks, addTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
