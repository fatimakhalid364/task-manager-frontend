import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        status: 'idle',
        successMsg: '',
        errorMsg: ''
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const {setValue} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;