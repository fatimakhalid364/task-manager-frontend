import { errorToast } from 'src/components/toasters/toast.js';
export function validatePassword(password) {
    // Minimum length check
    if (password.length < 8) {
        return { isValid: false, message: "Password must be at least 8 characters long." };
    }

    // Character type checks using regular expressions
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9\s]/.test(password);

    // Check for all character types
    if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecial) {
        return { isValid: false, message: "Password must contain uppercase, lowercase, digit, and special character." };
    }

    return { isValid: true, message: "Password is valid." };
}
export function validateSignup(userAccount, checked) {
    console.log('inside validators--------->')
    const { name, email, password, confirmPassword } = userAccount;

    if (!name || !email || !password || !confirmPassword) {
        errorToast('Please fill in all fields.', 'signup-error');
        return false;
    }

    if (password !== confirmPassword) {
        errorToast('Passwords do not match.', 'password-mismatc-error');
        return false;
    }

    const passwordStrength = validatePassword(password);
    if (!passwordStrength.isValid) {
        errorToast(passwordStrength.message, 'password-strength-error');
        return false;
    }

    if (!checked) {
        errorToast('Please agree to the terms and conditions.', 'terms-error');
        return false;
    }
    return true;
}

export function validateSignin(userAccount) {
    const { email, password } = userAccount;

    if (!email || !password) {
        errorToast('Please fill in both email and password.', 'signin-error'); // Use error toast
        return false;
    }
    return true;
}
export function validateResetForm(userAccount) {
    const { email } = userAccount;
    if (!email) {
        errorToast("Please fill email address", 'resetPass-error');
        return false;
    }
    return true;
}
export function validateSetForm(userAccount) {
    const { password, confirmPassword } = userAccount;
    if (!confirmPassword || !password) {
        errorToast("Please fill both fields", 'setPass-error-incomplete');
        return false;
    }
    if (confirmPassword !== password) {
        errorToast("Both passwords should be identical", 'setPass-error-dontMatch');
        return false;
    }
    return true;
}


export default { validateSignup, validateSignin, validateResetForm, validateSetForm };

