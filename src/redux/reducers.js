import { combineReducers } from 'redux';

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case SIGNIN_REQUEST:
            return {
            ...state,
            isLoading: true,
            error: null,
            };
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            return {
            ...state,
            isLoading: false,
            isAuthenticated: true,
            error: null,
            };
        case SIGNUP_FAILURE:
        case SIGNUP_FAILURE:
            return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            error: action.error,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;