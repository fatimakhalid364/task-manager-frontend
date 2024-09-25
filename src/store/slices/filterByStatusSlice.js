import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '0',
  notesFilterValue: '0', 
  checkboxStates: {
    'checkbox-not-started': false,
    'checkbox-pending': false,
    'checkbox-in-progress': false,
    'checkbox-complete': false,
},
notesCheckboxState: false,
};

const filterByStatusSlice = createSlice({
  name: 'filterByStatus',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setNotesFilterValue: (state, action) => {
      state.notesFilterValue = action.payload;
      console.log('state.notesFilterValue coming from the filterByStatusSlice is', state.notesFilterValue);
    },
    setCheckboxState: (state, action) => {
        const checkboxId = action.payload?.checkboxId;
        const isChecked = action.payload?.isChecked;
        state.checkboxStates[checkboxId] = isChecked;
        console.log('boolean value of the checkbox being clicked with the id ' + checkboxId + ' is ' + state.checkboxStates[checkboxId]);
    },
    setNotesCheckboxState: (state, action) => { 
      state.notesCheckboxState = action.payload
    }
  },
});

export const { setValue, setCheckboxState, setNotesFilterValue, setNotesCheckboxState } = filterByStatusSlice.actions;
export const filterByStatusReducer = filterByStatusSlice.reducer;