import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './resetSlice';

const highPriorityTasksSlice = createSlice({
    name: 'highPriorityTasks',
    initialState: {
        highPriorityTasks: [],
        highPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        setHighPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.highPriorityTasks = action.payload?.data?.data || [];
            state.highPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetState, (state) => {
                return {
                    highPriorityTasks: [],
                    highPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { setHighPriorityTasks } = highPriorityTasksSlice.actions;
export const highPriorityTasksReducer = highPriorityTasksSlice.reducer;
