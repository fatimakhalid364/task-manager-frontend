import classNames from 'classnames';
import PropTypes from 'prop-types';
import { baseURL, Screen } from "src/constants/constants";
import { getButtonText, getRoutingStatement, getRoutingText } from "src/utils/basicUtils";

function SubmitButton({ currentScreen, handleSubmit, disabled }) {
    const page = currentScreen === Screen.SIGNIN ? 'signup' : 'signin';
    const buttonClasses = classNames('submit-button', {
        'disabled-button': disabled // Apply 'disabled-button' class when disabled
    });
    return (
        <div className='submit-div'>
            <div className='submit-div-button'>
            <input
                type='button'
                value={getButtonText(currentScreen)}
                className={buttonClasses}
                onClick={handleSubmit}
                disabled={disabled}
            />
            </div>
            <div className='prompt-to-signin'>
                {getRoutingStatement(currentScreen)}
                <a href={`${baseURL}/authentication/${page}`}>{getRoutingText(currentScreen)}</a>
            </div>
        </div>
    );
}

SubmitButton.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired, // Change func to bool
};
export default SubmitButton;
