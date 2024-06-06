import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import taskManagerLogo from 'src/assets/Frame 3.svg';
import { Screen } from "src/constants/constants";
import { getTitleText } from "src/utils/basicUtils";
import BackToSite from './back-to-site.jsx';
import GoogleSSO from './google-signin.jsx';
import InputFields from './input-fields.jsx';

function CreateAccountForm({ currentScreen, pictureURL }) {
    console.log("current screen i am in ==>>", currentScreen);
    const titleText = getTitleText(currentScreen)
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} mb={-2} mt={-5}>
                    <BackToSite />
                </Grid>
                <Grid item xs={12}>
                    <div className='signup-form-header'>
                        <img className='logo-img' src={taskManagerLogo} alt='logo' />
                        <div className='create-account-text'>{titleText}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <form method='post' action='https://localhost:3000/signup'>
                        <InputFields pictureURL={pictureURL} currentScreen={currentScreen} />
                        <GoogleSSO />
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
CreateAccountForm.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
    pictureURL: PropTypes.string.isRequired,
};

export default CreateAccountForm;