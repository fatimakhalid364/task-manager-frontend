import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import drop from 'src/assets/drop.svg';
import { useResponsive } from 'src/constants/media_queries';
import { useAuth } from 'src/contexts/AuthContext.jsx';

import { capitalizeFirstLetter } from 'src/utils/basicUtils';



function ProfileSection() {
    const user = useSelector(state => state.auth?.user);
    const svgData = user?.avatar?.data
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    console.log(svgData)
    const toggleProfile = () => {
        setIsProfileOpen(prevState => !prevState);
    }
    // const capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        isBp6,
        isBp8,
        isMicroScreen,
    } = useResponsive();




    const formatUserName = () => {
        if (user) {
            let fullName = `${user?.firstName} ${user?.lastName}`;

            fullName = fullName.split(' ').map(name => capitalizeFirstLetter(name)).join(' ');

            if (fullName.length > 12) {
                fullName = fullName.slice(0, 12) + '...';
            }

            return fullName;
        }
        return '';
    }

    return (
        <div>
            {isAdaptableScreen ? (<div className='profile-div' onClick={toggleProfile} >

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {svgData ? (
                        <img style={{ borderRadius: '50px', border: '1px solid var(--primary-background-color)', padding: '1px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`} alt="User Avatar" width="40" height="40" />
                    ) : (
                        // Fallback image or placeholder if no SVG data
                        <img alt="Default Avatar" width="40" height="40" />
                    )}
                </div>
                <div className='profile-details'>
                    <div className='profile-name' style={{
                        width: isBp2 ? '96px' :
                            isBp3 ? '93px' :
                                isBp4 ? '90px' :
                                    isBp5 || isBp6 || isBp7 || isBp8 ? '83px' :
                                        '110.4px'
                    }}>

                        {formatUserName()}

                        <img src={drop} alt='drop-icon' className={`dropdown ${isProfileOpen ? 'rotate' : ''}`} />
                    </div>
                    <div className='profile-email' style={{
                        width: isBp2 ? '98px' :
                            isBp3 ? '96px' :
                                isBp4 ? '92px' :
                                    isBp5 || isBp6 || isBp7 || isBp8 ? '85px' :
                                        '112px'
                    }}>
                        {user?.email}
                    </div>
                    {isProfileOpen && (
                        <LogoutComp />
                    )}
                </div>

            </div>) : (<div style={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }} onClick={toggleProfile}>
                <img style={{ borderRadius: '50px', border: '1px solid var(--primary-background-color)', padding: '1px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`} alt="User Avatar" width="40" height="40" />
                    {isProfileOpen && (
                        <LogoutComp />
                    )}
            </div>)}

        </div>
    )
}

export default ProfileSection;

function LogoutComp() {
    const { logout } = useAuth();

    return (
        <div className='logout-button' style={{ bottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <CloseRoundedIcon className='cancel-button' />
            </div>
            <div className='logout-text'>
                Logout from account?
            </div>
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}