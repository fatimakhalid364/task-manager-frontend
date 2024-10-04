import { createSlice } from '@reduxjs/toolkit';
import createTaskThunk from '../thunks/create_task_thunk';
import { getAllTasksThunk } from '../thunks/taskThunks';
import { resetState } from './resetSlice';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        priorityTasks: [],
        metaData: {},
        priorityMetaData: {},
        loaded: false,
        loading: false,
        highPriorityCount: '',
        lowPriorityCount: '',
        mediumPriorityCount: '',
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
        },
        setHighPriorityCount: (state, action) => {
            if(action.payload <= 99) {
                return {
                    ...state,
                    highPriorityCount: action.payload
                }
            } else if(action.payload > 99) {
                return {
                    ...state,
                    highPriorityCount: '99..'
                }
            }
            
        },
        setMediumPriorityCount: (state, action) => {
            if(action.payload <= 99) {
                return {
                    ...state,
                    mediumPriorityCount: action.payload
                }
            } else if(action.payload > 99) {
                return {
                    ...state,
                    mediumPriorityCount: '99..'
                }
            }
        },
        setLowPriorityCount: (state, action) => {
            if(action.payload <= 99) {
                return {
                    ...state,
                    lowPriorityCount: action.payload
                }
            } else if(action.payload > 99) {
                return {
                    ...state,
                    lowPriorityCount: '99..'
                }
            }
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
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.metaData.total = (state.metaData.total || 0) + 1;
                if (state.metaData.range && typeof state.metaData.range.end === 'number') {
                    state.metaData.range.end += 1;
                } else {
                    state.metaData.range = {
                        ...state.metaData.range,
                        end: 1,
                    };
                }
            })
            // .addCase(deleteTaskThunk.fulfilled, (state, action) => {
            //     state.metaData.count = (state.metaData.count || 0) - 1;
            //     if (state.metaData.range && typeof state.metaData.range.end === 'number') {
            //         state.metaData.range.end -= 1;
            //     } else {
            //         state.metaData.range = {
            //             ...state.metaData.range,
            //             end: 0,
            //         };
            //     }
            // })
            .addCase(resetState, (state) => {
                return { tasks: [],
                    metaData: {},
                    loaded: false,
                    loading: false,
                    highPriorityCount: '',
                    lowPriorityCount: '',
                    mediumPriorityCount: '',};
            });
    },
});

export const { clearTasks, addTask, setTasks, setMetaData, setHighPriorityCount, setMediumPriorityCount, setLowPriorityCount } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
