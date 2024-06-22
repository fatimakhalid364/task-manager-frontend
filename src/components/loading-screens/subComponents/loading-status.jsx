import PropTypes from 'prop-types';
import { Screen } from "src/constants/constants";
import { getLoadingText } from 'src/utils/basicUtils';

function LoadingStatus({currentScreen}){
    return (
        <div 
            style={{
                    fontFamily: 'var(--secondary-font-family)'}}>
            {getLoadingText(currentScreen)}
        </div>
    )
}

LoadingStatus.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.LOADING, Screen.PAGE_NOT_FOUND, Screen.VERIFICATION_PAGE])
};

export default LoadingStatus;