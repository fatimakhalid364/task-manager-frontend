import { createSlice } from '@reduxjs/toolkit';
import { getAllNotesThunk } from 'src/store/thunks/notesThunk';



const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        metaData: {},
        status: 'idle',
        error: null,
        isLoading: false,
        successMsg: '',
        errorMsg: '',
        loaded: false
    },
    reducers: {
        clearNotes: (state, action) => {
            state.notes = action.payload || [];
            state.metaData = action.payload || {};
            state.loaded = false;
        },
        addNotes: (state, action) => {
            state.notes = [action.payload, ...state.notes];
        },
        setNotes: (state, action) => {
            console.log('insided the notesslice', action.payload);
            state.notes = action.payload;
            // state.metaData.total = state.metaData.total - 1
        },
        setMetaData: (state, action) => {
            console.log('insided the notesslice', action.payload);
            state.metaData = action.payload;
            // state.metaData.total = state.metaData.total - 1
        }
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
                console.log('Fulfilled: action.payload =', state.notes);
                
                state.loaded = true;
            })
            .addCase(getAllNotesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
                state.errorMsg = 'Error occured while retrieving note details!';
            })
            
    },
});



export const { clearNotes, addNotes, setNotes, setMetaData } = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
