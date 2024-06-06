
import resetPassword from 'src/assets/resetPassword.svg';
import AuthenticationPages from 'src/components/authentication/Authentication';
import { Screen } from "src/constants/constants";

function SetPassword() {
    return (
        <div>
            <AuthenticationPages currentScreen={Screen.SET_PASS} pictureURL={resetPassword} />
        </div>
    )
}

export default SetPassword;
