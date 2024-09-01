import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


const SettingsHeader = () => {
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

    const accentColor = useSelector((state) => state.appearance.color);

    const getActiveStyles = () => ({
        backgroundColor: 'white',
        color: accentColor === 'pink'
            ? 'var(--pink-accent-color)'
            : accentColor === 'green'
            ? 'var(--green-accent-color)'
            : accentColor === 'orange'
            ? 'var(--orange-accent-color)'
            : 'var(--primary-background-color)',
        boxShadow: '0px 2px 6px 0px #1018280F',
    });

    const getInactiveStyles = (hovered) => ({
        color: hovered
            ? accentColor === 'pink'
                ? 'var(--pink-accent-color)'
                : accentColor === 'green'
                ? 'var(--green-accent-color)'
                : accentColor === 'orange'
                ? 'var(--orange-accent-color)'
                : accentColor === 'blue'
                ? 'var(--primary-background-color)'
                : 'var(--quaternary-font-color)'
            : 'var(--quaternary-font-color)',
        fontFamily: 'var(--primary-font-family)',
        fontSize: '18px',
        cursor: 'pointer',
        height: '44px',
        width: '130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '22px',
    });

    return (
        <div className="settings-header-div">
            <div className="settings-header-text">
                Settings
            </div>
            <div className="settings-header-nav">
                <NavLink
                    className="settings-nav settings-general"
                    to='/settings/general'
                    style={({ isActive }) => isActive ? getActiveStyles() : getInactiveStyles(generalHovered)}
                    onMouseEnter={handleMouseEnter('general')}
                    onMouseLeave={handleMouseLeave('general')}
                >
                    General
                </NavLink>
                <NavLink
                    className="settings-nav settings-account"
                    to='/settings/account'
                    style={({ isActive }) => isActive ? getActiveStyles() : getInactiveStyles(accountHovered)}
                    onMouseEnter={handleMouseEnter('account')}
                    onMouseLeave={handleMouseLeave('account')}
                >
                    Account
                </NavLink>
                <NavLink
                    className="settings-nav settings-notification"
                    to='/settings/notification'
                    style={({ isActive }) => isActive ? getActiveStyles() : getInactiveStyles(notificationHovered)}
                    onMouseEnter={handleMouseEnter('notification')}
                    onMouseLeave={handleMouseLeave('notification')}
                >
                    Notification
                </NavLink>
                <NavLink
                    className="settings-nav settings-logout"
                    to='/settings/logout'
                    style={({ isActive }) => isActive ? getActiveStyles() : {}}
                >
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default SettingsHeader;