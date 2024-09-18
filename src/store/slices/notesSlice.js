import { createSlice } from '@reduxjs/toolkit';
import { getAllNotesThunk } from 'src/store/thunks/notesThunk';
import { resetState } from './resetSlice';

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
        notesLoaded: false,
    },
    reducers: {
        addNotes: (state, action) => {
            return {
                ...state,
                notes: [action.payload, ...state.notes],
            };
        },
        setNotes: (state, action) => {
            console.log('inside the notesSlice', action.payload);
            return {
                ...state,
                notes: action.payload,
            };
        },
        setMetaData: (state, action) => {
            console.log('inside the notesSlice', action.payload);
            return {
                ...state,
                metaData: action.payload,
            };
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllNotesThunk.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    error: null,
                    successMsg: '',
                    errorMsg: '',
                };
            })
            .addCase(getAllNotesThunk.fulfilled, (state, action) => {
                console.log('Fulfilled: action.payload =', action.payload);

                return {
                    ...state,
                    isLoading: false,
                    notes: action?.payload?.data || [],
                    metaData: action?.payload?.metaData || {},
                    successMsg: 'Task details retrieved successfully!',
                    errorMsg: '',
                    notesLoaded: true,
                };
            })
            .addCase(getAllNotesThunk.rejected, (state) => {
                return {
                    ...state,
                    isLoading: false,
                    error: "Internal server error",
                    successMsg: '',
                    errorMsg: '',
                };
            })
            .addCase(resetState, () => {
                return {
                    notes: [],
                    metaData: {},
                    status: 'idle',
                    error: null,
                    isLoading: false,
                    successMsg: '',
                    errorMsg: '',
                    notesLoaded: false
                };
            });
    },
});

export const { addNotes, setNotes, setMetaData } = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
