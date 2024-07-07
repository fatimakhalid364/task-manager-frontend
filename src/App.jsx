import { Route, Routes } from "react-router-dom";
import Dashboard from 'src/components/dashboard';
import Notes from 'src/components/notes';
import ForgotPassword from "src/pages/authentication/ForgotPassword";
import SetPassword from "src/pages/authentication/SetPassword";
import SigninpPage from 'src/pages/authentication/SigninPage';
import SignupPage from 'src/pages/authentication/SignupPage';
import DefaultPage from "src/pages/default/DefaultPage";
import VerificationWait from "src/pages/loading/verificationWait";
import './App.css';
import Calendar from "./components/calendar";
import Settings from "./components/settings";
import Tasks from "./components/tasks";
function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/signup' element={<SignupPage />} />
                <Route path='/authentication/signin' element={<SigninpPage />} />
                <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
                <Route path='/authentication/reset-password' element={<SetPassword />} />
                <Route path='/authentication/email-verification' element={<VerificationWait />} />
                <Route path='/default' element={<DefaultPage />}>
                    <Route path='/default/notes' element={<Notes />} />
                    <Route path='/default/dashboard' element={<Dashboard />} />
                    <Route path='/default/tasks' element={<Tasks />} />
                    <Route path='/default/calendar' element={<Calendar />} />
                    <Route path='/default/settings' element={<Settings />} />
                </Route> 
            </Routes>

        </div>
    );
}

export default App;