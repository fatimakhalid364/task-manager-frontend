import PropTypes from 'prop-types';
import { baseURL, Screen } from "src/constants/constants";
import { getButtonText, getRoutingStatement, getRoutingText } from "src/utils/basicUtils";

function SubmitButton({ currentScreen }) {
    const page = currentScreen === Screen.SIGNIN ? 'signup' : 'signin';
    return(
        <div className='submit-div'>
            <input type='submit' value={getButtonText(currentScreen)} className='submit-button' />
            <div className='prompt-to-signin'>{getRoutingStatement(currentScreen)}<a href={`${baseURL}/authentication/${page}`}>{getRoutingText(currentScreen)}</a></div>
        </div>
    )
}
SubmitButton.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
};
export default SubmitButton;