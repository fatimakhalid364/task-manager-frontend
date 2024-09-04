import { Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { CalendarComponent } from './components/calendar/Calendar';
import Dashboard from './components/dashboard';
// import Notes from './components/notes';
import GeneralPage from 'src/pages/settings/GeneralPage';
import Notes from '../src/components/notes/Notes';
import UpdateNote from '../src/components/notes/sub_components/update_notes/UpdateNote';
import RouteGuard from './components/RouteGuard;';
import Tasks from './components/tasks/tasks';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/authentication/ForgotPassword';
import SetPassword from './pages/authentication/SetPassword';
import SigninPage from './pages/authentication/SigninPage';
import SignupPage from './pages/authentication/SignupPage';
import ForgotVerificationWait from './pages/loading/forgotVerificationWait';
import VerificationWait from './pages/loading/verificationWait';
import { persistor } from './store/index';

function App() {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <Routes>
                    <Route path="/authentication/signup" element={<RouteGuard element={SignupPage} />} />
                    <Route path="/authentication/signin" element={<RouteGuard element={SigninPage} />} />
                    <Route path="/authentication/forgot-password" element={<RouteGuard element={ForgotPassword} />} />
                    <Route path="/authentication/reset-password" element={<RouteGuard element={SetPassword} />} />
                    <Route path="/authentication/forgot-email-verification" element={<RouteGuard element={ForgotVerificationWait} />} />
                    <Route path="/authentication/email-verification" element={<RouteGuard element={VerificationWait} />} />
                    <Route path="/notes" element={<RouteGuard element={Notes} />} />
                    <Route path="/dashboard" element={<RouteGuard element={Dashboard} />} />
                    <Route path="/tasks" element={<RouteGuard element={Tasks} />} />
                    <Route path="/calendar" element={<RouteGuard element={CalendarComponent} />} />
                    <Route path="/settings/general" element={<RouteGuard element={GeneralPage} />} />
                    <Route path="/notes/:id" element={<RouteGuard element={UpdateNote} />} />
                </Routes>
            </AuthProvider>
        </PersistGate>
    );
}

export default App;
