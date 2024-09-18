import { createSlice } from '@reduxjs/toolkit';
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
        clearTasks: (state, action) => {
            state.tasks = action.payload || [];
            state.metaData = action.payload || {};
            state.loaded = false;
        },
        addTask: (state, action) => {
            state.tasks = [action.payload, ...state.tasks];
        },
        setTasks: (state, action) => {
            console.log('insided the taskslice', action.payload);
            state.tasks = action.payload;
            // state.metaData.total = state.metaData.total - 1
        },
        setMetaData: (state, action) => {
            console.log('insided the taskslice', action.payload);
            state.metaData = action.payload;
            // state.metaData.total = state.metaData.total - 1
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(createTaskThunk.fulfilled, (state, action) => {
            //     state.tasks.push(action.payload.data);
            // })
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

export const { clearTasks, addTask, setTasks, setMetaData } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
