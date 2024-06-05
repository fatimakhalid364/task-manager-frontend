export function getButtonText(screen) {
    const buttonTextMap = {
        SIGNUP: 'Create Account',
        SIGNIN: 'Log In',
        FORGOT_PASS: 'Reset Password',
        SET_PASS: 'Set Password',
    };

    return buttonTextMap[screen] || 'Submit'; // Default case
}


