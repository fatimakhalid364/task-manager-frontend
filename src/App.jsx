import { Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { CalendarComponent } from './components/calendar/Calendar';
import Dashboard from './components/dashboard';
// import Notes from './components/notes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Settings from 'src/components/settings/settings';
import Notes from '../src/components/notes/Notes';
import UpdateNote from '../src/components/notes/sub_components/update_notes/UpdateNote';
import RouteGuard from './components/RouteGuard';
import Tasks from './components/tasks/tasks';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/authentication/ForgotPassword';
import SetPassword from './pages/authentication/SetPassword';
import SigninPage from './pages/authentication/SigninPage';
import SignupPage from './pages/authentication/SignupPage';
import ForgotVerificationWait from './pages/loading/forgotVerificationWait';
import VerificationWait from './pages/loading/verificationWait';
import HighTasks from './pages/tasks/HighTasks';
import LowTasks from './pages/tasks/LowTasks';
import MediumTasks from './pages/tasks/MediumTasks';
import { persistor } from './store/index';

function App() {
    const accentColor = useSelector((state) => state.appearance.color)
    useEffect(() => {

        // Update --active-background-color
        const activeBackgroundColor = accentColor === 'pink'
            ? 'var(--light-pink-color)'
            : accentColor === 'green'
            ? 'var(--light-green-color)'
            : accentColor === 'orange'
            ? 'var(--light-orange-color)'
            : '#EBF3FF'
           ;

        document.documentElement.style.setProperty('--active-background-color', activeBackgroundColor);

        // Update --primary-background-color
        const primaryBackgroundColor = accentColor === 'pink'
            ? 'var(--pink-accent-color)'
            : accentColor === 'green'
            ? 'var(--green-accent-color)'
            : accentColor === 'orange'
            ? 'var(--orange-accent-color)'
            :  '#3B8AFF'
           ;

        document.documentElement.style.setProperty('--primary-background-color', primaryBackgroundColor);

    }, [accentColor]);
    
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
                    <Route path="/tasks_high" element={<RouteGuard element={HighTasks} />} />
                    <Route path="/tasks_medium" element={<RouteGuard element={MediumTasks} />} />
                    <Route path="/tasks_low" element={<RouteGuard element={LowTasks} />} />
                    <Route path="/calendar" element={<RouteGuard element={CalendarComponent} />} />
                    <Route path="/settings" element={<RouteGuard element={Settings} />} />
                
                    <Route path="/notes/:id" element={<RouteGuard element={UpdateNote} />} />
                </Routes>
            </AuthProvider>
        </PersistGate>
    );
}

export default App;
