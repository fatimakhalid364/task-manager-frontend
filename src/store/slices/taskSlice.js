import { createSlice } from '@reduxjs/toolkit';
import { getAllTasksThunk } from '../thunks/taskThunks';
import { resetState } from './resetSlice';

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
            state.tasks = action.payload?.tasks || [];
            state.metaData = action.payload?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addTask: (state, action) => {
            state.tasks = [action.payload, ...state.tasks];
        },
        setTasks: (state, action) => {
            console.log('inside the taskslice', action.payload);
            state.tasks = action.payload;
        },
        setMetaData: (state, action) => {
            console.log('inside the taskslice', action.payload);
            state.metaData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.tasks = action.payload.data;
                state.metaData = action.payload.metaData; 
                state.loading = false;
                state.loaded = true;
            })
            .addCase(getAllTasksThunk.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resetState, (state) => {
                return {
                    tasks: [],
                    metaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { clearTasks, addTask, setTasks, setMetaData } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
