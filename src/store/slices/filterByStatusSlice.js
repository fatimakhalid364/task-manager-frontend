import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '0', 
  checkboxStates: {
    'checkbox-not-started': false,
    'checkbox-pending': false,
    'checkbox-in-progress': false,
    'checkbox-complete': false,
}
};

const filterByStatusSlice = createSlice({
  name: 'filterByStatus',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setCheckboxState: (state, action) => {
        const checkboxId = action.payload?.checkboxId;
        const isChecked = action.payload?.isChecked;
        state.checkboxStates[checkboxId] = isChecked
        console.log('boolean value of the checkbox being clicked with the id ' + checkboxId + ' is ' + state.checkboxStates[checkboxId]);
    }
  },
});

export const { setValue, setCheckboxState } = filterByStatusSlice.actions;
export const filterByStatusReducer = filterByStatusSlice.reducer;