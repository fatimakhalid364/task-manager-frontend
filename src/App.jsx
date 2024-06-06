
import { Route, Routes } from "react-router-dom";
import SignupPage from 'src/pages/authentication/SignupPage';
import './App.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/authentication/pages' element={<SignupPage />} />
            </Routes>

        </div>
    )
}

export default App;
