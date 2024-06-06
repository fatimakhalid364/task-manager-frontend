import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Screen } from "src/constants/constants";
import SubmitButton from './submit-button.jsx';


const CssTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiInput-underline:after': {
        borderBottom: 'none', // Remove underline border
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none', // Remove the default border
        },
        '&:hover fieldset': {
            border: '1px solid #D1D5DB', // Remove the default border on hover
        },
        '&.Mui-focused fieldset': {
            border: 'none', // Remove the default border when focused
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB', // Custom border color and style
        },
    },
    '& .MuiOutlinedInput-root': {
        width: '494px', // Set width
        height: '40px', // Set height
        borderRadius: '8px', // Set border radius
        padding: '10px', // Set padding
        '& input': {
            padding: '10px', // Additional padding inside the input
        },
        '& input::placeholder': {
            fontFamily: 'DM Sans', // Placeholder font family
            fontWeight: 400, // Placeholder font weight
            fontSize: '14px', // Placeholder font size
            lineHeight: '16px', // Placeholder line height
            color: '#9CA3AF', // Placeholder color
            width: '474px', // Placeholder width
            height: '16px', // Placeholder height
        },
    },
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'DM Sans', // Label font family
    fontWeight: 500, // Label font weight
    fontSize: '14px', // Label font size
    lineHeight: '16px', // Label line height
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

    function handleInputChange(event) {
        const { value, name } = event.target;
        setUserAccount((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div className='signup-input-fields'>
            <Grid container spacing={2}>
                {currentScreen === Screen.SIGNUP && (
                    <Grid item xs={12}>
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
                    </Grid>
                )}
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                {currentScreen === Screen.SIGNUP && (
                    <Grid item xs={12}>
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
                    </Grid>
                )}
                <Grid item xs={12}>
                    <SubmitButton currentScreen={currentScreen} />
                </Grid>
            </Grid>
        </div>
    );
}

InputFields.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
};

export default InputFields;
