import { DateTime } from 'luxon';
import { Screen } from "src/constants/constants";



export function getButtonText(screen) {
    const buttonTextMap = {
        [Screen.SIGNUP]: "Create Account",
        [Screen.SIGNIN]: "Log In",
        [Screen.FORGOT_PASS]: "Reset Password",
        [Screen.SET_PASS]: "Set Password",
    };

    return buttonTextMap[screen] || "Submit";
}
export function getTitleText(screen) {
    const titleTextMap = {
        [Screen.SIGNUP]: "Create Account",
        [Screen.SIGNIN]: "Sign in to your account",
        [Screen.FORGOT_PASS]: 'Reset Password?',
        [Screen.SET_PASS]: 'Add New Password',
    };

    return titleTextMap[screen] || 'Todo App';
}

export function getRoutingText(screen) {
    const routingTextMap = {
        [Screen.SIGNUP]: "Sign In",
        [Screen.SIGNIN]: "Sign Up",
    };

    return routingTextMap[screen] || '';
}

export function getRoutingStatement(screen) {
    const routingTextMap = {
        [Screen.SIGNUP]: "Already have an account? ",
        [Screen.SIGNIN]: "Don't have an account? ",
    };

    return routingTextMap[screen] || '';
}

export function getLoadingText(screen) {
    const loadingTextMap = {
        [Screen.LOADING]: "Loading. Please wait...",
        [Screen.PAGE_NOT_FOUND]: "Page not found.",
        [Screen.VERIFICATION_PAGE]: "Verifying your email. Please wait...",

    };
    return loadingTextMap[screen] || '';
}

export const capitalizeFirstLetter = (str) => {
    if (!str) {
        return '';
    }

    if (str.includes('_')) {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedWords.join(' ');
    } else if (str === str.toUpperCase()) {
        return str.charAt(0) + str.slice(1).toLowerCase();
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export const formatLocalDateTime = (dateString, timeZone = 'local', timeFormat = '', dateFormat) => {
    const date = DateTime.fromISO(dateString, { zone: 'utc' });
    if (timeFormat && timeZone) {
        const format = dateFormat + " " + timeFormat 
        const localDateTime = date.setZone(timeZone).toFormat(format);
        return localDateTime;
    } else {
        const format = dateFormat
        const localDateTime = date.toFormat(format);
        return localDateTime;
    }

    
};

export const getCurrentTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
}



