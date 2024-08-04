import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/LoadingScreens/CSSLoader';
import { logout as logoutAction, setUser } from '../store/slices/authSlice';
import { fetchKeyThunk, signinThunk } from '../store/thunks/authThunks';
import { decryptObjectValues } from '../utils/encryptionUtil';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, user, access_token } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoading(false);
        } else {
            dispatch(logoutAction());
            setIsLoading(false);
        }
    }, [dispatch]);

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await dispatch(signinThunk(credentials)).unwrap();
            const { access_token, user } = response.data;
            if (access_token) {
                localStorage.setItem('access_token', access_token);
                const fetchKeyResponse = await dispatch(fetchKeyThunk({})).unwrap();
                const privateKey = fetchKeyResponse.data.privateKey;
                localStorage.setItem('privateKey', privateKey);
                const decryptedUser = decryptObjectValues(user, privateKey);
                dispatch(setUser(decryptedUser));
            }
        } catch (error) {
            console.log('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoading(true); 
        dispatch(logoutAction());
        localStorage.removeItem('access_token');
        localStorage.removeItem('privateKey');
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
    </div>;
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, access_token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
