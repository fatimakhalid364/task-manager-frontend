import React from 'react';
import GoogleLogo from '../.././assets/Social icon.svg'

function GoogleSSO() {
    return(
        <div className='google-sso'>
            <button className='google-sso-button'>
                    <img src={GoogleLogo} alt='google logo'/> 
                    Sign in with Google
            </button>
        </div>
    )
};

export default GoogleSSO;