import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { resetState } from './resetSlice';

const initialState = {
  value: '0',
  notesFilterValue: '0',
  priorityFilterValue: '0',
  dueDateValueForTasks: {
    'startDate': null,
    'endDate': null
  },
  creationDateValueForTasks: dayjs(),
  creationDateValueForNotes: dayjs(),
  checkboxStates: {
    'NOT_STARTED': false,
    'PENDING': false,
    'IN_PROGRESS': false,
    'COMPLETED': false,
  },
  notesCheckboxState: false,
  priorityCheckboxStates: {
    'HIGH': false,
    'MEDIUM': false,
    'LOW': false,
 
  },
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
    setPriorityFilterValue: (state, action) => {
      state.priorityFilterValue = action.payload;
      console.log('state.PriorityFilterValue coming from the filterByStatusSlice is', state.priorityFilterValue);
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
      const {indicator, date} = action.payload;
      const stringDate = date.toISOString();
      return {
        ...state,
        dueDateValueForTasks: {
          ...state.dueDateValueForTasks,
          [indicator]: stringDate, 
        }
          // action.payload instanceof Date && !isNaN(action.payload)
          //   ? action.payload.toISOString()  // Convert Date to ISO string
          //   : state.dueDateValueForTasks    // Keep the existing value if invalid
      }
    },
    setCreationDateValueForTasks: (state, action) => {
      return {
        ...state,

        creationDateValueForTasks: action.payload.toISOString()
  



      }
    },
    setCreationDateValueForNotes: (state, action) => {
      return {
        ...state,

        creationDateValueForNotes: action.payload.toISOString()



      }
    },

    setPriorityCheckboxState: (state, action) => {
      const checkboxId = action.payload?.checkboxId;
      const isChecked = action.payload?.isChecked;
      state.priorityCheckboxStates = {
        ...state.priorityCheckboxStates,
        [checkboxId]: isChecked, // Create a new object for checkboxStates
      };
      console.log('boolean value of the PRIORITY checkbox being clicked with the id ' + checkboxId + ' is ' + state.priorityCheckboxStates[checkboxId]);
    },
    clearStartDate: (state) => {
      state.dueDateValueForTasks.startDate = null;
    },
    clearEndDate: (state) => {
      state.dueDateValueForTasks.endDate = null;
    },

    // Reset action for resetting the state to initialState
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => {
        return initialState; // Reset to the initial state
      });
  }
});

export const { setValue, 
  setCheckboxState, 
  setNotesFilterValue, 
  setNotesCheckboxState, 
  setPriorityCheckboxState, 
  setDueDateValueForTasks, 
  setCreationDateValueForTasks, 
  setCreationDateValueForNotes,
  setPriorityFilterValue,
  clearStartDate,
  clearEndDate,
  reset
} = filterByStatusSlice.actions;
export const filterByStatusReducer = filterByStatusSlice.reducer;