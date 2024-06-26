import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import CreateAccountForm from 'src/components/authentication/subComponents/main-form';
import { Screen } from "src/constants/constants";

function AuthenticationPages({ currentScreen, pictureURL }) {
    return (
        <Grid container sx={{ height: '98.5vh'}}>
            <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Box
                    sx={{
                        height: '100%',
                        width: { xs: '0px', sm: '0px', md: '470px', lg: '470px', xl: '600px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        backgroundImage: pictureURL ? `url(${pictureURL})` : `url(${pictureURL})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: '8px',
                    }}
                />
            </Grid>
            <Grid item xs={12} md={8} sx={{}}>
                <CreateAccountForm currentScreen={currentScreen} pictureURL={pictureURL} />
            </Grid>
            
            
        </Grid>
    );
}

AuthenticationPages.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
    pictureURL: PropTypes.string.isRequired,
};

export default AuthenticationPages;
