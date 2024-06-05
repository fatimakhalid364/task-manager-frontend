import React from 'react';
import BackToSite from './back-to-site.jsx';
import CreateAccountForm from './signup-form.jsx';

function AuthenticationPages({ currentScreen, pictureURL }) {
    return(
        <div className='signup-div'>
            <aside className='signup-sidecontent'>
                <img className='signup-image' src={pictureURL} alt='sign up frame' />
            </aside>
            <main>
                <BackToSite />
                <CreateAccountForm currentScreen={currentScreen} />
            </main>
        </div>
    )
}

export default AuthenticationPages;