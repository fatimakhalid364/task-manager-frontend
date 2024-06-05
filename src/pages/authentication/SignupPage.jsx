
import signUpFrame from 'src/assets/Frame 3289.svg';
import { Screen } from "src/constants/constants";
import AuthenticationPages from '../../components/authentication/Authentication';

function SignupPage() {
    return (
        <div>
            <AuthenticationPages currentScreen={Screen.SIGNUP} pictureURL={signUpFrame} />
        </div>
    )
}

export default SignupPage;
