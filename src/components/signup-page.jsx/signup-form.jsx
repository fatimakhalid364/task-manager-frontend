import React from 'react';
import taskManagerLogo from '../.././assets/Frame 3.svg';
import CheckBox from './checkbox-area.jsx';
import GoogleSSO from './google-signin.jsx';
import InputFields from './input-fields.jsx';
import SubmitButton from './submit-button.jsx';

function CreateAccountForm({ currentScreen }) {
    console.log("current screen i am in ==>>", currentScreen);
    return(
        <div className='signup-form'>
            <div className='signup-form-header'>
                <img className='logo-img' src={taskManagerLogo} alt='logo' />
                <div className='create-account-text'>Create Account</div>
            </div>
            <form method='post' action='https://localhost:3000/signup'>
                <InputFields currentScreen={currentScreen} />
                <CheckBox />
                <SubmitButton />
                <GoogleSSO />
            </form>
        </div>
    )
};

export default CreateAccountForm;