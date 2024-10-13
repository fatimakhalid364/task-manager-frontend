import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { formatReducer } from './slices//formatSlice';
import { appearanceReducer } from './slices/appearanceSlice';
import { authReducer } from "./slices/authSlice";
import { graphDataReducer } from './slices/chartsDataSlice';
import { filterByStatusReducer } from './slices/filterByStatusSlice';
import { highPriorityTasksReducer } from './slices/highPrioritySlice.js';
import { lowPriorityTasksReducer } from './slices/lowPrioritySlice.js';
import { mediumPriorityTasksReducer } from './slices/mediumPrioritySLice.js';
import { notesReducer } from './slices/notesSlice';
import { priorityTaskReducer } from './slices/priorityTaskSlice';
import { resetReducer, resetState } from './slices/resetSlice';
import { taskReducer } from './slices/taskSlice';




const rootReducer = combineReducers({
    auth: authReducer,
    appearance: appearanceReducer,
    format: formatReducer,
    tasks: taskReducer,
    filterByStatus: filterByStatusReducer,
    notes: notesReducer,
    reset: resetReducer,
    priorityTask: priorityTaskReducer,
    highPriorityTasks: highPriorityTasksReducer,
    mediumPriorityTasks: mediumPriorityTasksReducer,
    lowPriorityTasks: lowPriorityTasksReducer,
    chartsData: graphDataReducer,

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

