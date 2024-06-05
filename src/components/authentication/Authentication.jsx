import PropTypes from 'prop-types';
import BackToSite from './subComponents/back-to-site.jsx';
import CreateAccountForm from './subComponents/signup-form.jsx';

function AuthenticationPages({ currentScreen, pictureURL }) {
    return (
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
AuthenticationPages.propTypes = {
    currentScreen: PropTypes.oneOf(['signup', 'forgot-password']),
    pictureURL: PropTypes.string.isRequired, // Make pictureURL required
};
export default AuthenticationPages;