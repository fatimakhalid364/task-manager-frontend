// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { authReducer } from "./slices/authSlice";
import { searchReducer } from 'src/store/slices/searchSlice';
import { createTaskReducer } from 'src/store/slices/create_task_slice';
import { getAllTasksReducer } from 'src/store/slices/get_all_tasks_slice';



const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistCreateTaskReducer = persistReducer(persistConfig, createTaskReducer);
const persistGetAllTasksReducer = persistReducer(persistConfig, getAllTasksReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        search: searchReducer,
        createTask: persistCreateTaskReducer,
        getAllTasks: persistGetAllTasksReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export const persistor = persistStore(store);

export * from './thunks/authThunks';

export * from 'src/store/thunks/create_task_thunk';