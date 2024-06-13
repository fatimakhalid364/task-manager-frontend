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

