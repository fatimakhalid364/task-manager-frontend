import PropTypes from 'prop-types';
import taskManagerLogo from 'src/assets/Frame 3.svg';
import { Screen } from "src/constants/constants";
import { getTitleText } from "src/utils/basicUtils";
import CheckBox from './checkbox-area.jsx';
import GoogleSSO from './google-signin.jsx';
import InputFields from './input-fields.jsx';

function CreateAccountForm({ currentScreen }) {
    console.log("current screen i am in ==>>", currentScreen);
    const titleText = getTitleText(currentScreen)
    return (
        <div className='signup-form'>
            <div className='signup-form-header'>
                <img className='logo-img' src={taskManagerLogo} alt='logo' />
                <div className='create-account-text'>{titleText}</div>
            </div>
            <form method='post' action='https://localhost:3000/signup'>
                <InputFields currentScreen={currentScreen} />
                {
                    currentScreen === Screen.SIGNUP && 
                    <CheckBox />
                }
                <GoogleSSO />
            </form>
        </div>
    )
}
CreateAccountForm.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
};

export default CreateAccountForm;