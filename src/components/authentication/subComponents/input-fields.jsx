import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { defaultRedirect, Screen } from "src/constants/constants";
import { setUser } from 'src/store/slices/authSlice';
import { fetchKeyThunk, forgotPassThunk, signinThunk, signupThunk } from 'src/store/thunks/authThunks';
import { decryptObjectValues, encryptObjectValues } from "src/utils/encryptionUtil";
import { validateResetForm, validateSetForm, validateSignin, validateSignup } from 'src/utils/validators.js';
import SubmitButton from './submit-button.jsx';

const CssTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
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
        padding: '10px', 
        '& input': {
            padding: '10px',
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
    fontFamily: 'DM Sans', // Label font family
    fontWeight: 500, // Label font weight
    fontSize: theme.typography.body2.fontSize, // Use theme for font size
    lineHeight: theme.typography.body1.lineHeight, // Label line height
    color: '#1F2937', // Label color
    width: '494px', // Label width
    height: '16px', // Label height
}));

function InputFields({ currentScreen }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate(defaultRedirect); // Redirect to defaultRedirect if authenticated
        }
    }, [isAuthenticated, navigate]);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const successMsg = useSelector(state => state.auth.successMsg);
    const errorMsg = useSelector(state => state.auth.errorMsg);

    const [userAccount, setUserAccount] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [checked, setChecked] = useState(false);
    const [spinner, setSpinner] = useState(false);
    function handleInputChange(event) {
        const { value, name } = event.target;
        setUserAccount((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    function handleCheckboxChange(event) {
        setChecked(event.target.checked);
    }



    function getValidationFunction() {
        console.log('inside function selector');
        return currentScreen === Screen.SIGNUP ? validateSignup(userAccount, checked) : currentScreen === Screen.SIGNIN ? validateSignin(userAccount) : currentScreen === Screen.SET_PASS ? validateSetForm(userAccount) : validateResetForm(userAccount);
    }

    const handleButtonClick = async () => {
        const validation = getValidationFunction();
        console.log("Encrypting the data")
        const encryptedObj = encryptObjectValues(userAccount)
        console.log("Encrypted the data")

        // let encryptedObj = userAccount

        if (validation) {
            try {
                let thunkToDispatch;
                switch (currentScreen) {
                    case Screen.SIGNUP:
                        thunkToDispatch = signupThunk(encryptedObj);
                        break;
                    case Screen.SIGNIN:
                        thunkToDispatch = signinThunk(encryptedObj);
                        break;
                    case Screen.FORGOT_PASS:
                        thunkToDispatch = forgotPassThunk(encryptedObj);
                        break;
                    default:
                        break;
                }

                if (thunkToDispatch) {
                    setSpinner(true);
                    const response = await dispatch(thunkToDispatch).unwrap();
                    if (currentScreen === Screen.SIGNIN && response.data.access_token) {
                        const data = response.data;
                        console.log(data.access_token);
                        localStorage.setItem("access_token", data.access_token);

                        const fetchKeyResponse = await dispatch(fetchKeyThunk({})).unwrap();
                        const _privateKey = fetchKeyResponse.data.privateKey;
                        const decryptObj = decryptObjectValues(data.user, _privateKey);
                        console.log(decryptObj);
                        dispatch(setUser(decryptObj));
                        console.log('Fetched key:', fetchKeyResponse);
                        // Handle response as needed
                    }
                    setSpinner(false); 
                    console.log('Dispatched thunk response:', successMsg);
                    { successMsg ? successToast(response.message, 'authentication-pages-success') : errorToast('Something went wrong', 'authentication-pages-error') }
                }
            } catch (error) {
                setSpinner(false);
                console.error('Error occurred while dispatching thunk:', error);
                errorToast(error.message, 'authentication-pages-error');
            }
        } else {
            console.error('Validation failed for the current screen.');
        }
    };
    const debouncedHandleButtonClick = useCallback(debounce(handleButtonClick, 300), [userAccount, currentScreen]);

    return (
        <div>
            <SpinnerLoader showSpinner={spinner} />
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentScreen === Screen.SIGNUP && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                        <LabelTypography variant="body1" gutterBottom>
                            Name
                        </LabelTypography>
                        <CssTextField
                            placeholder="Enter your name"
                            variant="outlined"
                            name="name"
                            value={userAccount.name}
                            onChange={handleInputChange}
                        />
                        </div>

                    </Grid>
                )}
                {currentScreen !== Screen.SET_PASS && 
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                    <LabelTypography variant="body1" gutterBottom>
                        Email
                    </LabelTypography>
                    <CssTextField
                        placeholder="Enter your email"
                        variant="outlined"
                        name="email"
                        value={userAccount.email}
                        onChange={handleInputChange}
                    />
                    </div>
                    </Grid>}
                {currentScreen !== Screen.FORGOT_PASS && 
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                    <LabelTypography variant="body1" gutterBottom>
                        Password
                    </LabelTypography>
                    <CssTextField
                        placeholder="Enter your password"
                        variant="outlined"
                        name="password"
                        value={userAccount.password}
                        onChange={handleInputChange}
                        type="password"
                    />
                    </div>
                    </Grid>}
                {(currentScreen === Screen.SIGNUP || currentScreen === Screen.SET_PASS) && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                        <LabelTypography variant="body1" gutterBottom>
                            Confirm Password
                        </LabelTypography>
                        <CssTextField
                            placeholder="Confirm your password"
                            variant="outlined"
                            name="confirmPassword"
                            value={userAccount.confirmPassword}
                            onChange={handleInputChange}
                            type="password"
                        />
                        </div>
                    </Grid>
                )}
                {(currentScreen === Screen.SIGNUP || currentScreen === Screen.SIGNIN) && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: currentScreen === Screen.SIGNUP ? 'center' : null }}>
                        <div className='checkbox' style={{marginLeft: currentScreen === Screen.SIGNIN ? '25.6%' : null}}>
                            <input
                                type='checkbox'
                                id='checkbox'
                                name='checkbox'
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            {currentScreen === Screen.SIGNUP ? (
                                <label htmlFor='checkbox'>
                                I agree to the <a href='/terms-and-services'>Terms & Conditions</a>
                                </label>
                            ) : currentScreen === Screen.SIGNIN ? (
                                <label htmlFor='checkbox'>
                                Remember Me
                                </label>
                            ) : null}

                        </div>
                        {currentScreen === Screen.SIGNIN && (
                            <div className='forgot-password-text'>
                                <a href='/authentication/forgot-password'>Forgot password?</a>
                            </div>
                        )}
                    </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SubmitButton
                        currentScreen={currentScreen}
                        handleSubmit={debouncedHandleButtonClick}
                        isLoading={isLoading}
                        disabled={currentScreen === Screen.SIGNUP && !checked} // Disable the button if signup screen and checkbox not checked
                    />
                </Grid>
            </Grid>
        </div>
    );
}

InputFields.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
};

export default InputFields;

