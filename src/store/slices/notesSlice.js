import { createSlice } from '@reduxjs/toolkit';
import { getAllNotesThunk } from 'src/store/thunks/notesThunk';



const getAllNotesSlice = createSlice({
    name: 'getAllNotes',
    initialState: {
        notes: [],
        metaData: {},
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: '',
        errorMsg: '',
    },
    reducers: {
        setAllNotes: (state, action) => {
            state.allNotes = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllNotesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = '';
                state.errorMsg = '';
            })
            .addCase(getAllNotesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload.data;
                state.metaData = action.payload.metaData; 
                state.successMsg = 'task details retrieved successful!ly';
                state.errorMsg = '';
                console.log('Fulfilled: action.payload =', state.allNotes);
            })
            .addCase(getAllNotesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Error occured while retrieving task details!';
            })
            
    },
});



export const { setGetAllNotes } = getAllNotesSlice.actions;

export const notesReducer = getAllNotesSlice.reducer;
