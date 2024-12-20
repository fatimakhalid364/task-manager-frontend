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
        setLowPriorityMetaData: (state, action) => {
            return {
                ...state,
                lowPriorityMetaData: action.payload
            }
        },
        setLowPriorityMetaDecri: (state, action) => {
            if (state.lowPriorityMetaData?.range?.end !== undefined) {
                state.lowPriorityMetaData.range.end -= 1;
            }
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
        },
        clearLowPriorityTasks: (state, action) => {
            return {
                ...state,
                lowPriorityTasks: action.payload
            }
        },
        updateLowStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;
            const task = state.lowPriorityTasks.find(task => task._id === taskId);
            if (task) {
                task.status = newStatus;
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

export const { setLowPriorityTasks, updateLowStatus, setLowPriorityMetaDecri, addLowPriorityTasks, updateLowPriorityTasks, clearLowPriorityTasks, setLowPriorityMetaData } = lowPriorityTasksSlice.actions;
export const lowPriorityTasksReducer = lowPriorityTasksSlice.reducer;
