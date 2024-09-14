import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    checkboxStates: {
        'checkbox-not-started': false,
        'checkbox-pending': false,
        'checkbox-inprogress': false,
        'checkbox-complete': false,
    }
};

const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState,
    reducers: {
        setCheckboxState: (state, action) => {
            const { checkboxId, isChecked } = action.payload;
            state.checkboxStates[checkboxId] = isChecked;
        },
    },
});

export const { setCheckboxState } = checkboxSlice.actions;
export const checkboxReducer = checkboxSlice.reducer;