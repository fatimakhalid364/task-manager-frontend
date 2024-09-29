import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { formatReducer } from './slices//formatSlice';
import { appearanceReducer } from './slices/appearanceSlice';
import { authReducer } from "./slices/authSlice";
import { filterByStatusReducer } from './slices/filterByStatusSlice';
import { notesReducer } from './slices/notesSlice';
import { resetReducer, resetState } from './slices/resetSlice';
import { taskReducer } from './slices/taskSlice';
import dayjs from 'dayjs';



const rootReducer = combineReducers({
    auth: authReducer,
    appearance: appearanceReducer,
    format: formatReducer,
    tasks: taskReducer,
    filterByStatus: filterByStatusReducer,
    notes: notesReducer,
    reset: resetReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});


export const clearStore = () => {
    store.dispatch(resetState());
    persistor.purge();
};

export const persistor = persistStore(store);

export * from './thunks/authThunks';

export * from 'src/store/thunks/create_task_thunk';

