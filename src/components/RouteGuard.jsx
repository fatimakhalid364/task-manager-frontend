import { Navigate, useLocation } from 'react-router-dom';
import { defaultRedirect } from '../constants/constants';
import { useAuth } from '../contexts/AuthContext';

const RouteGuard = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const access_token = localStorage.getItem("access_token");
    const location = useLocation();
    const isAuthRoute =
        location.pathname.startsWith('/authentication');
    if (isAuthenticated && isAuthRoute) {
        return <Navigate to={defaultRedirect} replace />;
    }
    if (!isAuthenticated && !isAuthRoute) {
        return <Navigate to="/authentication/signin" replace />;
    }
    return <Component {...rest} />;
};

export default RouteGuard;
