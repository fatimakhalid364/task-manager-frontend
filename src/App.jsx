
import { Route, Routes } from "react-router-dom";
import SigninpPage from 'src/pages/authentication/SigninPage';
import SignupPage from 'src/pages/authentication/SignupPage';
import './App.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/signup' element={<SignupPage />} />
                <Route path='/authentication/signin' element={<SigninpPage />} />
            </Routes>

        </div>
    )
}

export default App;
