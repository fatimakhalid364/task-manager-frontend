export function getButtonText(screen) {
    const buttonTextMap = {
        SIGNUP: 'Create Account',
        SIGNIN: 'Log In',
        FORGOT_PASS: 'Reset Password',
        SET_PASS: 'Set Password',
    };

    return buttonTextMap[screen] || 'Submit'; // Default case
}
export function getTitleText(screen) {
    const buttonTextMap = {
        SIGNUP: 'Create Account',
        SIGNIN: 'Log In',
        FORGOT_PASS: 'Reset Password?',
        SET_PASS: 'Add New Password',
    };

    return buttonTextMap[screen] || 'Todo App'; // Default case
}


