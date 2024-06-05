
import { Screen } from "src/constants/constants";
import signUpFrame from '../../src/assets/Frame 3289.svg';
import '../App.css';
import SignAuthenticationPagesup from './signup-page.jsx/signup-main';

function App() {
    return (
        <div>
            <SignAuthenticationPagesup currentScreen={Screen.signup} pictureURL={signUpFrame} />
        </div>
    )
}

export default App;
