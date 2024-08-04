
import { errorToast } from 'src/components/toasters/toast.js';
import { logout } from '../store/slices/authSlice';


export const HandleAuthError = (error, thunkAPI) => {

    if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(logout());
        errorToast('Logged In on another device', 'getTask-pages-error');

    }
    return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
        message: error.response.data.error,
    });
};
