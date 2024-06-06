
import { Route, Routes } from "react-router-dom";
import SigninpPage from 'src/pages/authentication/SigninPage';
import SignupPage from 'src/pages/authentication/SignupPage';
import './App.css';
import ForgotPassword from "./pages/authentication/ForgotPassword";
import SetPassword from "./pages/authentication/SetPassword";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/signup' element={<SignupPage />} />
                <Route path='/authentication/signin' element={<SigninpPage />} />
                <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
                <Route path='/authentication/reset-password' element={<SetPassword />} />

            </Routes>

        </div>
    )
}

export default App;
