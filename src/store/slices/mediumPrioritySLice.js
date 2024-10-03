import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './resetSlice';

const mediumPriorityTasksSlice = createSlice({
    name: 'mediumPriorityTasks',
    initialState: {
        mediumPriorityTasks: [],
        mediumPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        setMediumPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.mediumPriorityTasks = action.payload?.data?.data || [];
            state.mediumPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetState, (state) => {
                return {
                    mediumPriorityTasks: [],
                    mediumPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { setMediumPriorityTasks } = mediumPriorityTasksSlice.actions;
export const mediumPriorityTasksReducer = mediumPriorityTasksSlice.reducer;
