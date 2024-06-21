import React from 'react';
import { getLoadingText } from 'src/utils/basicUtils';
import PropTypes from 'prop-types';

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
    currentScreen: PropTypes.oneOf([Screen.LOADING, Screen.PAGE_NOT_FOUND])
};

export default LoadingStatus;