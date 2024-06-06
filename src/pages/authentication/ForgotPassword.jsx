
import forgotPassword from 'src/assets/forgotPassword.svg';
import AuthenticationPages from 'src/components/authentication/Authentication';
import { Screen } from "src/constants/constants";

function ForgotPassword() {
    return (
        <div>
            <AuthenticationPages currentScreen={Screen.FORGOT_PASS} pictureURL={forgotPassword} />
        </div>
    )
}

export default ForgotPassword;
