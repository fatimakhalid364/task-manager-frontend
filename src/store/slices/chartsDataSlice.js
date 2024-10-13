import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";

const graphDataSlice = createSlice({
    name: 'graphData',
    initialState: {
        graphData: '',
        status: 'idle',
        successMsg: '',
        errorMsg: '',
        loading: false,
        error: null,
    },
    reducers: {
        setGraphValue: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.graphData = action.payload.data;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setGraphValue } = graphDataSlice.actions;
export const graphDataReducer = graphDataSlice.reducer;
