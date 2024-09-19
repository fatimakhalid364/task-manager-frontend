import { createSlice } from '@reduxjs/toolkit';

const resetSlice = createSlice({
    name: 'reset',
    initialState: {},
    reducers: {
        resetState: () => ({})
    }
});

export const { resetState } = resetSlice.actions;
export const resetReducer = resetSlice.reducer;
