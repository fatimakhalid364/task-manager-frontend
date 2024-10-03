import { createSlice } from '@reduxjs/toolkit';
import { getPriorityTasksThunk } from '../thunks/taskThunks';
import { resetState } from './resetSlice';

const lowPriorityTasksSlice = createSlice({
    name: 'lowPriorityTasks',
    initialState: {
        lowPriorityTasks: [],
        lowPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        clearLowPriorityTasks: (state, action) => {
            state.lowPriorityTasks = action.payload?.tasks || [];
            state.lowPriorityMetaData = action.payload?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addLowPriorityTasks: (state, action) => {
            state.lowPriorityTasks = [action.payload, ...state.tasks];
        },
        setLowPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.lowPriorityTasks = action.payload;
        },
        setLowPriorityMetaData: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.lowPriorityMetaData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getPriorityTasksThunk.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(getPriorityTasksThunk.fulfilled, (state, action) => {
            //     state.lowPriorityTasks = action.payload.data;
            //     state.lowPriorityMetaData = action.payload.metaData;
            //     state.loading = false;
            //     state.loaded = true;
            // })
            // .addCase(getPriorityTasksThunk.rejected, (state) => {
            //     state.loading = false;
            // })
            .addCase(resetState, (state) => {
                return {
                    lowPriorityTasks: [],
                    lowPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { clearLowPriorityTasks, addLowPriorityTasks, setLowPriorityTasks, setLowPriorityMetaData } = lowPriorityTasksSlice.actions;
export const lowPriorityTasksReducer = lowPriorityTasksSlice.reducer;
