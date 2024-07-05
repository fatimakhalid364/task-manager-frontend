import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { baseURL, Screen } from "src/constants/constants";
import { getButtonText, getRoutingStatement, getRoutingText } from "src/utils/basicUtils";

function SubmitButton({ currentScreen, handleSubmit, disabled, isLoading }) {
    const page = currentScreen === Screen.SIGNIN ? 'signup' : currentScreen === Screen.SIGNUP ? 'signin' : null;
    const buttonText = getButtonText(currentScreen);
    return (
        <div className='submit-div'>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '40%' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        disableElevation
                        sx={{
                            height: '40px',
                            backgroundColor: 'var(--primary-background-color)',
                            borderRadius: '28px',
                            marginBottom: '8px',
                            fontFamily: 'var(--secondary-font-family)',
                            fontSize: 'var(--secondary-font-size)',
                            color: 'var(--neutral-font-color)',
                            cursor: 'pointer',
                            ...(disabled && {
                                backgroundColor: 'var(--primary-button-disabled-color)',
                                borderColor: 'var(--primary-button-disabled-color)',
                            }),
                        }}
                        onClick={handleSubmit}
                        disabled={disabled}
                    >
                        {isLoading ? 'Loading...' : buttonText}
                        
                    </Button>
                </Box>
            </Box>
            <div className='prompt-to-signin'>
                {getRoutingStatement(currentScreen)}
                <a href={`${baseURL}/authentication/${page}`}>
                    {getRoutingText(currentScreen)}
                </a>
            </div>
        </div>
    );
}

SubmitButton.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool.isRequired, // Change func to bool
};
export default SubmitButton;
