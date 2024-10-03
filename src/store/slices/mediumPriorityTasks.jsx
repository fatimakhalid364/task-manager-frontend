import { createSlice } from '@reduxjs/toolkit';
import { getPriorityTasksThunk } from '../thunks/taskThunks';
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
        clearMediumPriorityTasks: (state, action) => {
            state.mediumPriorityTasks = action.payload?.tasks || [];
            state.mediumPriorityMetaData = action.payload?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addMediumPriorityTasks: (state, action) => {
            state.mediumPriorityTasks = [action.payload, ...state.tasks];
        },
        setMediumPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.mediumPriorityTasks = action.payload;
        },
        setMediumPriorityMetaData: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.mediumPriorityMetaData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getPriorityTasksThunk.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(getPriorityTasksThunk.fulfilled, (state, action) => {
            //     state.mediumPriorityTasks = action.payload.data;
            //     state.mediumPriorityMetaData = action.payload.metaData;
            //     state.loading = false;
            //     state.loaded = true;
            // })
            // .addCase(getPriorityTasksThunk.rejected, (state) => {
            //     state.loading = false;
            // })
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

export const { clearMediumPriorityTasks, addMediumPriorityTasks, setMediumPriorityTasks, setMediumPriorityMetaData } = mediumPriorityTasksSlice.actions;
export const mediumPriorityTasksReducer = mediumPriorityTasksSlice.reducer;
