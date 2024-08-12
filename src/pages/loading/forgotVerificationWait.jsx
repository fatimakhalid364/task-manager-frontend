import debounce from 'lodash/debounce'; // Import debounce from lodash
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from 'src/components/LoadingScreens/CSSLoader';
import LoadingStatus from 'src/components/LoadingScreens/LoadingStatus';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { Screen } from 'src/constants/constants';
import { resetVerificationEmailThunk } from 'src/store/thunks/authThunks';

function ForgotVerificationWait() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [verificationProcessed, setVerificationProcessed] = useState(false);

    // Debounced sendVerification function
    const sendVerification = debounce(async () => {
        if (token && !verificationProcessed) {
            try {
                // Mark verification as in progress
                setVerificationProcessed(true);

                // Dispatch verification thunk
                console.log("Calling the thunk");
                const response = await dispatch(resetVerificationEmailThunk(token)).unwrap();
                console.log('Verification response:', response);
                localStorage.setItem('tempToken', response?.tempToken);

                successToast('Verification successful!', 'email-success');
                navigate('/authentication/reset-password');
            } catch (error) {
                console.log('Error during verification:', error);
                errorToast(`Verification failed: ${error.message}`, 'email-error');
            } finally {
                setVerificationProcessed(false);
            }
        } else if (!token) {
            errorToast('Verification token is missing', 'email-error');
        }
    }, 500);

    useEffect(() => {
        console.log('useEffect triggered with token:', token);
        sendVerification();
        return () => sendVerification.cancel();
    }, [token, dispatch, navigate, verificationProcessed, sendVerification]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loader />
            <LoadingStatus currentScreen={Screen.VERIFICATION_PAGE} />
        </div>
    );
}

export default ForgotVerificationWait;
