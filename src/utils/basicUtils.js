import { Screen } from "src/constants/constants";
export function getButtonText(screen) {
    const buttonTextMap = {
        [Screen.SIGNUP]: "Create Account",
        [Screen.SIGNIN]: "Log In",
        [Screen.FORGOT_PASS]: "Send Email",
        [Screen.SET_PASS]: "Change Password",
    };

    return buttonTextMap[screen] || "Submit";
}
export function getTitleText(screen) {
    const titleTextMap = {
        [Screen.SIGNUP]: "Create Account",
        [Screen.SIGNIN]: "Log In",
        [Screen.FORGOT_PASS]: 'Reset Password?',
        [Screen.SET_PASS]: 'Add New Password',
    };

    return titleTextMap[screen] || 'Todo App';
}


