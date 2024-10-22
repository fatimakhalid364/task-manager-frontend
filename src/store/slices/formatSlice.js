// formatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateFormat: 'dd MMM yyyy',
  timeFormat: 'hh:mm a',
  language: "ENGLISH",
};

const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {
    setDateFormat: (state, action) => {
      console.log('Setting Date Format:', action.payload);
      state.dateFormat = action.payload;
    },
    setTimeFormat: (state, action) => {
      console.log('Setting Time Format:', action.payload);
      state.timeFormat = action.payload;
    },
    setLanguageFormat: (state, action) => {
      console.log('Setting language Format:', action.payload);
      state.language = action.payload;
    },
  },
});

export const { setDateFormat, setTimeFormat, setLanguageFormat } = formatSlice.actions;
export const formatReducer = formatSlice.reducer;
