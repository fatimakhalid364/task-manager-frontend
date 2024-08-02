import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainDiv from "src/components/maindiv/maindiv";

function Calendar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/authentication/signin'); // Redirect to defaultRedirect if authenticated
        }
    }, [isAuthenticated, navigate]);
    return (
        <MainDiv />
    )
}

export default Calendar;