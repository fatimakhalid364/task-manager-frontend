import { signupRequest, signinRequest, signupSuccess, signinSuccess, signupFailure, signinFailure } from './actions';
import { signupAPI, signinAPI } from 'src/utils/APIs'; 

export const signup = (userData) => {
    return async (dispatch) => {
        dispatch(signupRequest()); 

        try {
        const response = await signupAPI(userData); 
        if (response.status === 'success') {
            dispatch(signupSuccess());
            console.log('signup successful'); 
        } else {
            dispatch(signupFailure(response.error));
            console.log('signup failed');  
        }
        } catch (error) {
        dispatch(signupFailure('An error occurred while dispatching signup action: ' + error.message)); 
        }
    };
};

export const signin = (userData) => {
    return async (dispatch) => {
        dispatch(signinRequest()); 

        try {
        const response = await signinAPI(userData); 
        if (response.status === 'success') {
            dispatch(signinSuccess());
            console.log('signin successful');
        } else {
            dispatch(signinFailure(response.error));
            console.log('signin failed');
        }
        } catch (error) {
        dispatch(signinFailure('An error occurred while dispatching signin action: ' + error.message)); 
        }
    };
};