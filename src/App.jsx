
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "src/pages/authentication/ForgotPassword";
import SetPassword from "src/pages/authentication/SetPassword";
import SigninpPage from 'src/pages/authentication/SigninPage';
import SignupPage from 'src/pages/authentication/SignupPage';
import PageNotFound from "src/pages/loading/pageNotFound";
import VerificationWait from "src/pages/loading/verificationWait";
import TasksPage from "src/pages/tasks/TasksPage";
import './App.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/signup' element={<SignupPage />} />
                <Route path='/authentication/signin' element={<SigninpPage />} />
                <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
                <Route path='/authentication/reset-password' element={<SetPassword />} />
                <Route path='/*' element={<PageNotFound />} />
                <Route path='/authentication/email-verification' element={<VerificationWait />} />
                <Route path='/tasks' element={<TasksPage />} />

                

            </Routes>

        </div>
    )
}

export default App;
