import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '0', 
};

const filterByStatusSlice = createSlice({
  name: 'filterByStatus',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = filterByStatusSlice.actions;
export const filterByStatusReducer = filterByStatusSlice.reducer;