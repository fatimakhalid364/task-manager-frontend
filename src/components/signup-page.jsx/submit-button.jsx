import React from 'react';
import { getButtonText } from "src/utils/basicUtils";
function SubmitButton({ currentScreen }) {

    const text = getButtonText(currentScreen)

    return(
        <div className='submit-div'>
            <input type='submit' value={text} className='submit-button' />
            <div className='prompt-to-signin'>Already have an account? <a href='https://localhost:3000/signin'>Sign in</a></div>
        </div>
    )
}

export default SubmitButton;