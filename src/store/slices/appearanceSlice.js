import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: 'blue', 
};

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = appearanceSlice.actions;
export const appearanceReducer = appearanceSlice.reducer;