const localURL = 'http://localhost:5173';
const liveURL = 'https://tm-git-notes-ali013s-projects.vercel.app';

export const baseURL = liveURL;
export const defaultRedirect = `/tasks`;

export const LIVE_API = 'https://task-manager-backend-roan.vercel.app/api'
export const LOCAL_API = 'http://localhost:3000/api';
export const BACKEND_APIS = LOCAL_API;
export const Screen = {
    SIGNUP: 'SIGNUP',
    SIGNIN: 'SIGNIN',
    FORGOT_PASS: 'FORGOT_PASS',
    SET_PASS: 'SET_PASS',
    LOADING: 'LOADING',
    PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
    VERIFICATION_PAGE: 'VERIFICATION_PAGE'
};

export const RoutesObj = {
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    notes: 'Notes',
    calendar: 'Calendar',
    settings: 'Settings',
}


