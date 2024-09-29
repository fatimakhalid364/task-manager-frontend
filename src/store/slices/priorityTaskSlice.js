import { createSlice } from '@reduxjs/toolkit';
import { getPriorityTasksThunk } from '../thunks/taskThunks';
import { resetState } from './resetSlice';

const priorityTaskSlice = createSlice({
    name: 'priorityTask',
    initialState: {
        priorityTasks: [],
        priorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        clearPriorityTasks: (state, action) => {
            state.priorityTasks = action.payload?.tasks || [];
            state.priorityMetaData = action.payload?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addPriorityTask: (state, action) => {
            state.priorityTasks = [action.payload, ...state.tasks];
        },
        setPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.priorityTasks = action.payload;
        },
        setPriorityMetaData: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.priorityMetaData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPriorityTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPriorityTasksThunk.fulfilled, (state, action) => {
                state.priorityTasks = action.payload.data;
                state.priorityMetaData = action.payload.metaData;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(getPriorityTasksThunk.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resetState, (state) => {
                return {
                    priorityTasks: [],
                    priorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { clearTasks, addTask, setTasks, setMetaData } = priorityTaskSlice.actions;
export const priorityTaskReducer = priorityTaskSlice.reducer;
