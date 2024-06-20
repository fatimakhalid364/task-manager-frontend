
import { Route, Routes } from "react-router-dom";
import SigninpPage from 'src/pages/authentication/SigninPage';
import SignupPage from 'src/pages/authentication/SignupPage';
import './App.css';
import ForgotPassword from "src/pages/authentication/ForgotPassword";
import SetPassword from "src/pages/authentication/SetPassword";
import PageNotFound from "src/pages/loading/pageNotFound";
import PleaseWait from "src/pages/loading/pleaseWait";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/signup' element={<SignupPage />} />
                <Route path='/authentication/signin' element={<SigninpPage />} />
                <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
                <Route path='/authentication/reset-password' element={<SetPassword />} />
                <Route path='/page-not-found' element={<PageNotFound />} />
                <Route path='/please-wait' element={<PleaseWait />} />
                

            </Routes>

        </div>
    )
}

export default App;
