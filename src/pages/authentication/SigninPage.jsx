
import signUpFrame from 'src/assets/Frame 3289.svg';
import AuthenticationPages from 'src/components/authentication/Authentication';
import { Screen } from "src/constants/constants";

function SignupPage() {
    return (
        <div>
            <AuthenticationPages currentScreen={Screen.SIGNIN} pictureURL={signUpFrame} />
        </div>
    )
}

export default SignupPage;