import React from 'react';

function SubmitButton(){


    return(
        <div className='submit-div'>
            <input type='submit' value='Create Account' className='submit-button' />
            <div className='prompt-to-signin'>Already have an account? <a href='https://localhost:3000/signin'>Sign in</a></div>
        </div>
    )
}

export default SubmitButton;