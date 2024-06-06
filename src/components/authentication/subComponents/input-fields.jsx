import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Screen } from "src/constants/constants";
import { validateResetForm, validateSetForm, validateSignin, validateSignup } from 'src/utils/validators.js';
import SubmitButton from './submit-button.jsx';

const CssTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiInput-underline:after': {
        borderBottom: 'none', // Remove underline border
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
    const [userAccount, setUserAccount] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [checked, setChecked] = useState(false);

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

    return (
        <div>
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
                {currentScreen === Screen.SIGNUP && (
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                id='checkbox'
                                name='checkbox'
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='checkbox'>
                                I agree to the <a href='https://localhost:3000/terms-and-services'>Terms & Conditions</a>
                            </label>
                        </div>
                    </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SubmitButton
                        currentScreen={currentScreen}
                        handleSubmit={getValidationFunction}
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

