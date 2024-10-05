import { createSlice } from '@reduxjs/toolkit';
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
        setLowPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.lowPriorityTasks = action.payload?.data?.data || [];
            state.lowPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addLowPriorityTasks: (state, action) => {
            return {
                ...state,
                lowPriorityTasks: [action.payload, ...state.lowPriorityTasks]
            }
        },
        updateLowPriorityTasks: (state, action) => {
            return {
                ...state,
                lowPriorityTasks: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
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

export const { setLowPriorityTasks,  addLowPriorityTasks,  updateLowPriorityTasks } = lowPriorityTasksSlice.actions;
export const lowPriorityTasksReducer = lowPriorityTasksSlice.reducer;
