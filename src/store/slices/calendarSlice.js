import { createSlice } from "@reduxjs/toolkit";
import { fetchCalendarTasksThunk } from 'src/store/thunks/taskThunks'; // Adjust path if necessary
import { resetState } from './resetSlice';

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        calendarData: [],
        status: 'idle',
        successMsg: '',
        errorMsg: '',
        loading: false,
        error: null,
        loaded: false,
    },
    reducers: {
        setCalendarValues: (state, action) => {
            console.log('..................', action.payload)
            state.calendarData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarTasksThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalendarTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchCalendarTasksThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetState, (state) => {
                return {
                    calendarData: [],
                    status: 'idle',
                    successMsg: '',
                    errorMsg: '',
                    loading: false,
                    error: null,
                    loaded: false,
                };
            });
    },
});

export const { setCalendarValues } = calendarSlice.actions;
export const calendarDataReducer = calendarSlice.reducer;
