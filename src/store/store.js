// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
