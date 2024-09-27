import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './resetSlice';
import dayjs from 'dayjs';

const initialState = {
  value: '0',
  notesFilterValue: '0',
  dueDateValueForTasks: dayjs(),
  creationDateValueForTasks: dayjs(),
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
      state.checkboxStates = {
        ...state.checkboxStates,
        [checkboxId]: isChecked, // Create a new object for checkboxStates
      };
      console.log('boolean value of the checkbox being clicked with the id ' + checkboxId + ' is ' + state.checkboxStates[checkboxId]);
    },
    setNotesCheckboxState: (state, action) => { 
      state.notesCheckboxState = action.payload;
    },
    setDueDateValueForTasks: (state, action) => {
      return {
        ...state,
        // dueDateValueForTasks: action.payload.isValid() 
        // ? action.payload 
        // : state.filterByStatus.dueDateValueForTasks
        dueDateValueForTasks: 
         action.payload 
        


      }
    },
    setCreationDateValueForTasks: (state, action) => {
      return {
        ...state,
        // dueDateValueForTasks: action.payload.isValid() 
        // ? action.payload 
        // : state.filterByStatus.dueDateValueForTasks
        creationDateValueForTasks: 
         action.payload 
        


      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => {
        return initialState; // Reset to the initial state
      });
  }
});

export const { setValue, setCheckboxState, setNotesFilterValue, setNotesCheckboxState, setDueDateValueForTasks, setCreationDateValueForTasks   } = filterByStatusSlice.actions;
export const filterByStatusReducer = filterByStatusSlice.reducer;