import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmailIcon from 'src/assets/EmailIcon.svg';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { Screen } from "src/constants/constants";
import { useResponsive } from "src/constants/media_queries";
import { forgotPassThunk, resetPassThunk, signupThunk } from 'src/store/thunks/authThunks';
import { encryptObjectValues } from "src/utils/encryptionUtil";
import { validateResetForm, validateSetForm, validateSignin, validateSignup } from 'src/utils/validators.js';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import NotificationModal from '../../notifications/NotificationModal.jsx';
import SubmitButton from './submit-button.jsx';

import './authentication.css';

const userDetails = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInput-underline:after': {
        borderBottom: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: `1px solid #3B8AFF`,
        },
        '&.Mui-focused fieldset': {
            border: `2px solid #3B8AFF`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
        width: '494px',
        height: '40px',
        borderRadius: '8px',
        padding: '4px',
        '& input': {
            padding: '4px',
        },
        '& input::placeholder': {
            fontFamily: 'DM Sans',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '16px',
            color: '#9CA3AF',
            width: '474px',
            height: '16px',
        },
    },
}));
const LabelTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'DM Sans',
    fontWeight: 500,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    color: '#1F2937',
    width: '90%',
    height: '16px',
}));

const getValidationFunction = (currentScreen, userAccount, checked) => {
    switch (currentScreen) {
        case Screen.SIGNUP:
            return validateSignup(userAccount, checked);
        case Screen.SIGNIN:
            return validateSignin(userAccount);
        case Screen.SET_PASS:
            return validateSetForm(userAccount);
        case Screen.FORGOT_PASS:
            return validateResetForm(userAccount);
        default:
            return null;
    }
};

const InputFields = ({ currentScreen }) => {
    const {
        isAdaptableScreen,
        expandBar,
        onWholeScreen,

        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login } = useAuth();
    const isLoading = useSelector(state => state.auth.isLoading);
    const successMsg = useSelector(state => state.auth.successMsg);
    const errorMsg = useSelector(state => state.auth.errorMsg);

    const [modalOpen, setModalOpen] = useState(false);
    const [userAccount, setUserAccount] = useState(
        userDetails
    );
    const [checked, setChecked] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const updateUserAccount = (name, value) => {
        setUserAccount(prev => ({ ...prev, [name]: value }));
    };
    const handleInputChange = (event) => {
        const { value, name } = event.target;
        updateUserAccount(name, value); 
    };

    const handleCheckboxChange = () => setChecked(prev => !prev);

    const handleButtonClick = async () => {
        const validation = getValidationFunction(currentScreen, userAccount, checked);
        if (!validation) {
            console.error('Validation failed for the current screen.');
            return;
        }

        const encryptedObj = encryptObjectValues(userAccount);
        if (currentScreen === Screen.SET_PASS) {
            encryptedObj.tempToken = localStorage.getItem("tempToken");
        }

        try {
            let thunkToDispatch;
            switch (currentScreen) {
                case Screen.SIGNUP:
                    thunkToDispatch = signupThunk(encryptedObj);
                    break;
                case Screen.SIGNIN:
                    await login(encryptedObj);
                    break;
                case Screen.FORGOT_PASS:
                    thunkToDispatch = forgotPassThunk(encryptedObj);
                    break;
                case Screen.SET_PASS:
                    thunkToDispatch = resetPassThunk(encryptedObj);
                    break;
                default:
                    return;
            }

            if (thunkToDispatch) {
                setSpinner(true);
                const response = await dispatch(thunkToDispatch).unwrap();
                setSpinner(false);
                successToast(response.message, 'authentication-pages-success');
                if (currentScreen !== Screen.SIGNIN) {
                    setModalOpen(true);
                }
            }
        } catch (error) {
            setSpinner(false);
            errorToast(error.message, 'authentication-pages-error');
        }
    };

    const debouncedHandleButtonClick = useCallback(debounce(handleButtonClick, 300), [userAccount, currentScreen]);

    const handleOkay = () => {
        setModalOpen(false);
        if (currentScreen === Screen.SIGNUP || currentScreen === Screen.SET_PASS) {
            navigate('/authentication/signin');
        }
    };

    const handleCancel = () => setModalOpen(false);

    return (
        <div>
            <SpinnerLoader showSpinner={spinner} />
            {modalOpen && (
                <NotificationModal
                    open={modalOpen}
                    onOkay={handleOkay}
                    onCancel={handleCancel}
                    title={
                        currentScreen === Screen.SIGNUP ? 'Email Verification Required' :
                            currentScreen === Screen.FORGOT_PASS ? 'Reset password mail is sent' :
                                currentScreen === Screen.SET_PASS ? "Password Updated" : ""
                    }
                    message={
                        currentScreen === Screen.SIGNUP ? "Thank you for signing up! We've sent a verification link to your email address. If you don't see the email, check your spam or junk folder." :
                            currentScreen === Screen.FORGOT_PASS ? "Verify your identity by clicking the verification link." :
                                currentScreen === Screen.SET_PASS ? 'Please go to the login page and use your new password' : ''
                    }
                    titleInfo={userAccount.email}
                    icon={EmailIcon}
                    primaryButtonText={currentScreen === Screen.FORGOT_PASS ? "Got it !!!" : 'Take me to Login'}
                    primaryButtonColor='primary'
                    secondaryButtonText='Cancel'
                    secondaryButtonColor='default'
                    notificationType='INFO'
                />
            )}
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentScreen === Screen.SIGNUP && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isMicroScreen && '0' }}>
                        <div>
                            <LabelTypography variant="body1" gutterBottom>Name</LabelTypography>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={userAccount.name}
                                    onChange={handleInputChange}
                                    className='authentication-input'
                                    style={{width: isMicroScreen ? '350px' : '494px'}}
                                />
                        </div>
                    </Grid>
                )}
                {currentScreen !== Screen.SET_PASS && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isMicroScreen && '0' }}>
                        <div>
                            <LabelTypography variant="body1" gutterBottom>Email</LabelTypography>
            
                             <input
                                    type="text"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={userAccount.email}
                                    onChange={handleInputChange}
                                    className='authentication-input'
                                    style={{width: isMicroScreen ? '350px' : '494px'}}
                                />
                        </div>
                    </Grid>
                )}
                {currentScreen !== Screen.FORGOT_PASS && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isMicroScreen && '0' }}>
                        <div>
                            <LabelTypography variant="body1" gutterBottom>Password</LabelTypography>
                             <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={userAccount.password}
                                    onChange={handleInputChange}
                                    className='authentication-input'
                                    style={{width: isMicroScreen ? '350px' : '494px'}}
                                />
                        </div>
                    </Grid>
                )}
                {(currentScreen === Screen.SIGNUP || currentScreen === Screen.SET_PASS) && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isMicroScreen && '0' }}>
                        <div>
                            <LabelTypography variant="body1" gutterBottom>Confirm Password</LabelTypography>
                             <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    name="confirmPassword"
                                    value={userAccount.confirmPassword}
                                    onChange={handleInputChange}
                                    className='authentication-input'
                                    style={{width: isMicroScreen ? '350px' : '494px'}}
                                />
                        </div>
                    </Grid>
                )}
                {(currentScreen === Screen.SIGNUP || currentScreen === Screen.SIGNIN) && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='checkbox'>
                            {currentScreen === Screen.SIGNUP && (
                                <>
                                    <input
                                        type='checkbox'
                                        id='checkbox'
                                        name='checkbox'
                                        checked={checked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor='checkbox'>
                                        I agree to the <a href='/terms-and-services'>Terms & Conditions</a>
                                    </label>
                                </>
                            )}
                        </div>
                        {currentScreen === Screen.SIGNIN && (
                            <div className='forgot-password-text'>
                                <a href='/authentication/forgot-password'>Forgot password?</a>
                            </div>
                        )}
                    </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMicroScreen && '500px' }}>
                    <SubmitButton
                        currentScreen={currentScreen}
                        handleSubmit={debouncedHandleButtonClick}
                        isLoading={isLoading}
                        disabled={currentScreen === Screen.SIGNUP && !checked}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

InputFields.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]).isRequired,
};

export default InputFields;
