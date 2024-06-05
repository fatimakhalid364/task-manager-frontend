import React from 'react';
import taskManagerLogo from '../.././assets/Frame 3.svg';
import InputFields from './input-fields.jsx';
import CheckBox from './checkbox-area.jsx';
import SubmitButton from './submit-button.jsx';
import GoogleSSO from './google-signin.jsx';

function CreateAccountForm(){
    return(
        <div className='signup-form'>
            <div className='signup-form-header'>
                <img className='logo-img' src={taskManagerLogo} alt='logo' />
                <div className='create-account-text'>Create Account</div>
            </div>
            <form method='post' action='https://localhost:3000/signup'>
                <InputFields />
                <CheckBox />
                <SubmitButton />
                <GoogleSSO />
            </form>
        </div>
    )
};

export default CreateAccountForm;