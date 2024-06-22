import debounce from 'lodash/debounce'; // Import debounce from lodash
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from 'src/components/loading-screens/subComponents/loader';
import LoadingStatus from 'src/components/loading-screens/subComponents/loading-status';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { Screen } from 'src/constants/constants';
import { verificationEmailThunk } from 'src/store/thunks/authThunks';

function VerificationWait() {
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
                const response = await dispatch(verificationEmailThunk(token)).unwrap();
                console.log('Verification response:', response);
                successToast('Verification successful!', 'email-success');
                navigate('/authentication/signin');
            } catch (error) {
                console.log('Error during verification:', error);
                errorToast(`Verification failed: ${error.message}`, 'email-error');
            } finally {
                // Reset verificationProcessed state after completion
                setVerificationProcessed(false);
            }
        } else if (!token) {
            errorToast('Verification token is missing', 'email-error');
        }
    }, 500); // Adjust debounce delay as needed (e.g., 500ms)

    useEffect(() => {
        console.log('useEffect triggered with token:', token);
        sendVerification();
        // Cleanup function to cancel debounce on component unmount
        return () => sendVerification.cancel();
    }, [token, dispatch, navigate, verificationProcessed, sendVerification]); // Ensure correct dependencies

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loader />
            <LoadingStatus currentScreen={Screen.VERIFICATION_PAGE} />
        </div>
    );
}

export default VerificationWait;
