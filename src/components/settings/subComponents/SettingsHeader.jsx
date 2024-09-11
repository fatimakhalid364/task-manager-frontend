
import { useSelector } from "react-redux";
import { useState } from "react";
import { useResponsive } from 'src/constants/media_queries';


const SettingsHeader = ({ handleGeneralClick, 
    handleNotificationClick, 
    handleAccountClick, 
    handleLogoutClick,
    isAccountClicked,
    isGeneralClicked,
    isNotificationClicked,
    isLogoutClicked}) => {
        const {
            isAdaptableScreen,
            onWholeScreen,
            isMicroScreen,
        } = useResponsive();
    const [generalHovered, setGeneralHovered] = useState(false);
    const [accountHovered, setAccountHovered] = useState(false);
    const [notificationHovered, setNotificationHovered] = useState(false);

    const handleMouseEnter = (type) => () => {
        switch (type) {
            case 'general':
                setGeneralHovered(true);
                break;
            case 'account':
                setAccountHovered(true);
                break;
            case 'notification':
                setNotificationHovered(true);
                break;
            default:
                break;
        }
    };

    const handleMouseLeave = (type) => () => {
        switch (type) {
            case 'general':
                setGeneralHovered(false);
                break;
            case 'account':
                setAccountHovered(false);
                break;
            case 'notification':
                setNotificationHovered(false);
                break;
            default:
                break;
        }
    };

   

    const getActiveStyles = () => ({
        backgroundColor: 'white',
        color: 'var(--primary-background-color)',
        boxShadow: '0px 2px 6px 0px #1018280F',
    });

    

    return (
        <div className="settings-header-div">
            <div className="settings-header-text">
                Settings
            </div>
            <div className="settings-header-nav">
                <div
                    className="settings-nav settings-general"
                  
                    style={{ backgroundColor: (isGeneralClicked && !isMicroScreen) ? 'white' : 'inherit', 
                        color: isGeneralClicked && 'var(--primary-background-color)', 
                        boxShadow: (isGeneralClicked && !isMicroScreen) ? '0px 2px 6px 0px #1018280F' : 'none',
                        fontSize: isMicroScreen ? '15px' : '18px'}}
                    onMouseEnter={handleMouseEnter('general')}
                    onMouseLeave={handleMouseLeave('general')}
                    onClick={ handleGeneralClick}
                >
                    General
                </div>
                <div
                    className="settings-nav settings-account"
                   
                    style={{ backgroundColor: (isAccountClicked && !isMicroScreen) ? 'white' : 'inherit',
                        color: isAccountClicked && 'var(--primary-background-color)', 
                        boxShadow: (isAccountClicked && !isMicroScreen) ? '0px 2px 6px 0px #1018280F' : 'none',
                        fontSize: isMicroScreen ? '15px' : '18px'}}
                    onMouseEnter={handleMouseEnter('account')}
                    onMouseLeave={handleMouseLeave('account')}
                    onClick={ handleAccountClick}
                >
                    Account
                </div>
                <div
                    className="settings-nav settings-notification"
                   
                    style={{ backgroundColor: (isNotificationClicked && !isMicroScreen) ? 'white' : 'inherit', 
                        color: isNotificationClicked && 'var(--primary-background-color)', 
                        boxShadow: (isNotificationClicked && !isMicroScreen) ? '0px 2px 6px 0px #1018280F' : 'none',
                        fontSize: isMicroScreen ? '15px' : '18px'}}
                    onMouseEnter={handleMouseEnter('notification')}
                    onMouseLeave={handleMouseLeave('notification')}
                    onClick={ handleNotificationClick}
                >
                    Notification
                </div>
                <div
                    className="settings-nav settings-logout"
                    
                    style={{ backgroundColor: (isLogoutClicked && !isMicroScreen) ? 'white' : 'inherit', 
                        color: isLogoutClicked && 'var(--primary-background-color)', 
                        boxShadow: (isLogoutClicked && !isMicroScreen) ? '0px 2px 6px 0px #1018280F' : 'none',
                        fontSize: isMicroScreen ? '15px' : '18px'}}
                    onClick={ handleLogoutClick}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SettingsHeader;