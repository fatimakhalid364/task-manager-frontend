import { NavLink, Outlet } from "react-router-dom";

const SettingsHeader= ()=> {
    const activeStyles = {
        backgroundColor: 'white',
        color: 'var(--primary-background-color)',
        boxShadow: '0px 2px 6px 0px #1018280F',
    };
    return (
    <div className="settings-header-div">
        <div className="settings-header-text">
            Settings
        </div>
        <div className="settings-header-nav">
            <NavLink 
               className=" settings-nav settings-general"
                to='/settings/general'
                style={({ isActive }) => isActive ? activeStyles : {}}      
            >
                General
            </NavLink>
            <NavLink 
                className="settings-nav settings-account"
                to='/settings/account'
                style={({ isActive }) => isActive ? activeStyles : {}}
            >
                Account
            </NavLink>
            <NavLink 
              className="settings-nav settings-notification"
                to='/settings/notification'
                style={({ isActive }) => isActive ? activeStyles : {}}       
            >
                Notofication
            </NavLink>
            <NavLink 
                className="settings-nav settings-logout"
                to='/settings/logout'
                style={({ isActive }) => isActive ? activeStyles : {}} 
            >
                Logout
            </NavLink>
        </div>
    </div>)
}

export default SettingsHeader;