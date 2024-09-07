
import { useSelector } from "react-redux";
import { useState } from "react";


const SettingsHeader = ({ handleGeneralClick, 
    handleNotificationClick, 
    handleAccountClick, 
    handleLogoutClick,
    isAccountClicked,
    isGeneralClicked,
    isNotificationClicked,
    isLogoutClicked}) => {
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
                  
                    style={{ backgroundColor: isGeneralClicked && 'white', color: isGeneralClicked && 'var(--primary-background-color)', boxShadow: isGeneralClicked && '0px 2px 6px 0px #1018280F'}}
                    onMouseEnter={handleMouseEnter('general')}
                    onMouseLeave={handleMouseLeave('general')}
                    onClick={ handleGeneralClick}
                >
                    General
                </div>
                <div
                    className="settings-nav settings-account"
                   
                    style={{ backgroundColor: isAccountClicked && 'white', color: isAccountClicked && 'var(--primary-background-color)', boxShadow: isAccountClicked && '0px 2px 6px 0px #1018280F'}}
                    onMouseEnter={handleMouseEnter('account')}
                    onMouseLeave={handleMouseLeave('account')}
                    onClick={ handleAccountClick}
                >
                    Account
                </div>
                <div
                    className="settings-nav settings-notification"
                   
                    style={{ backgroundColor: isNotificationClicked && 'white', color: isNotificationClicked && 'var(--primary-background-color)', boxShadow: isNotificationClicked && '0px 2px 6px 0px #1018280F'}}
                    onMouseEnter={handleMouseEnter('notification')}
                    onMouseLeave={handleMouseLeave('notification')}
                    onClick={ handleNotificationClick}
                >
                    Notification
                </div>
                <div
                    className="settings-nav settings-logout"
                    
                    style={{ backgroundColor: isLogoutClicked && 'white', color: isLogoutClicked && 'var(--primary-background-color)', boxShadow: isLogoutClicked && '0px 2px 6px 0px #1018280F'}}
                    onClick={ handleLogoutClick}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SettingsHeader;