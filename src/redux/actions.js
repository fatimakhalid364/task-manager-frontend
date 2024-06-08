import { SIGNUP_REQUEST, SIGNIN_REQUEST, SIGNUP_SUCCESS, SIGNIN_SUCCESS, SIGNUP_FAILURE, SIGNIN_FAILURE} from './action-types';

export const signupRequest = () => ({
    type: SIGNUP_REQUEST,
});

export const signinRequest = () => ({
    type: SIGNIN_REQUEST,
});

export const signupSuccess = () => ({
    type: SIGNUP_SUCCESS,
});

export const signinSuccess = () => ({
    type: SIGNIN_SUCCESS,
});

export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    error,
});

export const signinFailure = (error) => ({
    type: SIGNIN_FAILURE,
    error,
});