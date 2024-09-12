import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "src/utils/basicUtils";
import { useResponsive } from 'src/constants/media_queries';

const Account = () => {
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const user = useSelector(state => state.auth?.user);
    const svgData = user?.avatar?.data;

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
        <div className = 'account-page-content'>
            <div className="account-profile-div">
                <div className="account-profile-text">
                    <div className="account-profile-header">Your Avatar</div>
                    <div className="account-profile-para">This will display on your profile.</div>
                </div>
                <div className="account-profile-picture">
                <img style={{ borderRadius: '50px', border: '1px solid var(--primary-background-color)', padding: '1px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`} alt="User Avatar" width="50" height="50" />
                </div>
            </div>
            <div className="end-line"></div>
            <div className="account-details-div">
                <div className="account-details-username">
                    { !isMicroScreen && (<div className="account-details-text">Username</div>)}
                    <div className="account-details-display" style={{width: isMicroScreen && '95%'}}>
                        <div className="account-username-text">Name</div>
                        <div className="account-box" style={{width: isMicroScreen && '100%'}}>
                            { formatUserName()}
                
                        </div>
                    </div>
                </div>
                <div className="account-details-email">
                    { !isMicroScreen && (<div className="account-details-text">Email</div>)}
                    <div className="account-details-display" style={{width: isMicroScreen && '95%'}}>
                    <div className="account-email-text">Email</div>
                        <div className="account-box" style={{width: isMicroScreen && '100%'}}>
                            { user?.email}
                        </div>
                    </div>
                </div>
            </div>
            <div className="end-line"></div>
            <div className="account-change-password-div">
                <div className="account-change-password-text" style={{marginLeft: isMicroScreen && '24%'}}>Change Password</div>
                <div className="account-current-password account-password">
                    {  !isMicroScreen && (<div className="cp-text" >Current Password</div>)}
                    <div className="cp-input-div" style={{width: isMicroScreen && '95%'}}>
                        <div className="cp-input-header">Current Password</div>
                        <input type="text" className="cp-input" style={{width: isMicroScreen && '100%'}} />
                        <a href='/authentication/forgot-password' style={{display: 'flex', justifyContent: 'flex-end', marginTop: '8px', color: 'var(--primary-background-color)', fontFamily: 'var(--secondary-font-family)', fontWeight: '500', fontSize: '14px'}}>Forgot Password?</a>
                    </div>
                  
                </div>
              
                <div className="account-new-password account-password">
                    {  !isMicroScreen && (<div className="np-text">New Password</div>)}
                    <div className="np-input-div" style={{width: isMicroScreen && '95%'}}>
                        <div className="np-input-header">New Password</div>
                        <input type="password" className="np-input" style={{width: isMicroScreen && '100%'}}/>
                    </div>
                </div>
                <div className="account-retype-password account-password">
                    {  !isMicroScreen && (<div className="rp-text">Retype Password</div>)}
                    <div className="rp-input-div" style={{width: isMicroScreen && '95%'}}>
                        <div className="rp-input-header">Retype Password</div>
                        <input type="password" className="rp-input" style={{width: isMicroScreen && '100%'}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Account}