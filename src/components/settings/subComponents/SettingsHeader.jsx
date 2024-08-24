const SettingsHeader= ()=> {
    return (<div className="settings-header-div">
        <div className="settings-header-text">
            Settings
        </div>
        <div className="settings-header-nav">
            <div className=" settings-nav settings-general">
                General
            </div>
            <div className="settings-nav settings-account">
                Account
            </div>
            <div className="settings-nav settings-notification">
                Notification
            </div>
            <div className="settings-nav settings-logout">
                Logout
            </div>
        </div>
    </div>)
}

export default SettingsHeader;