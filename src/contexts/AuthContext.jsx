import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/LoadingScreens/CSSLoader';
import { errorToast } from 'src/components/toasters/toast.js';
import { clearStore } from "src/store/index.js";
import { clearTasks } from "src/store/slices/taskSlice";
import { logout as logoutAction, setUser } from '../store/slices/authSlice';
import { fetchKeyThunk, signinThunk } from '../store/thunks/authThunks';
import { decryptObjectValues } from '../utils/encryptionUtil';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, user, access_token } = useSelector((state) => state.auth);
    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()); // Dispatch logout action
            await dispatch(clearTasks());  // Dispatch clearTasks action
            localStorage.removeItem('access_token');
            localStorage.removeItem('privateKey');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoading(false);
        } else {
            dispatch(logoutAction());
            dispatch(clearTasks());
            setIsLoading(false);
        }
        setIsLoading(false);
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
                console.log('dispatching the user', decryptedUser);
                dispatch(setUser(decryptedUser));
                console.log('User is set')
            }
        } catch (error) {
            console.log('Something went wrong', error);
            errorToast(error.message, 'authentication-pages-error');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true); 
        await dispatch(clearTasks());

        dispatch(logoutAction());
        clearStore();
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
