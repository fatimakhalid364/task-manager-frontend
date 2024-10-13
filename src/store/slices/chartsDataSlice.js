import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";
import { resetState } from './resetSlice';

const graphDataSlice = createSlice({
    name: 'graphData',
    initialState: {
        graphData: {
            barGraph: {

            },
            pieGraph: {

            },
            statusGraph: {

            }
        },
        status: 'idle',
        successMsg: '',
        errorMsg: '',
        loading: false,
        error: null,
        loaded: false,
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
                state.loaded = true;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetState, (state) => {
                return {
                    graphData: {
                        barGraph: {

                        },
                        pieGraph: {

                        },
                        statusGraph: {

                        }
                    },
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

export const { setGraphValue } = graphDataSlice.actions;
export const graphDataReducer = graphDataSlice.reducer;
