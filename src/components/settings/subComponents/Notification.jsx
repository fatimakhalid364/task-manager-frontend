const Notification = () => {
    return (
        <div className='settings-notifications-div'>
            <div className="email-notifications-div">
                <div className="email-notifictions-text">
                    <div className="email-notifications-header"></div>
                    <div className="email-notifications-para"></div>
                </div>
            </div>
            <div className="email-notifications-toggles">
                <div className="email-remind-me-box">
                    <div className="email-remind-me-text">
                        <div className="email-remind-me-header"></div>
                        <div className="email-remind-me-para"></div>
                    </div>
                    <div className="email-remind-me-toggle">

                    </div>
                </div>
                <div className="email-task-due-box">
                    <div className="email-task-due-text">
                        <div className="email-task-due-header"></div>
                        <div className="email-task-due-para"></div>
                    </div>
                    <div className="email-task-due-toggle">
                        
                    </div>
                </div>
                <div className="email-task-completed-box">
                    <div className="email-task-completed-text">
                        <div className="email-task-completed-header"></div>
                        <div className="email-task-completed-para"></div>
                    </div>
                    <div className="email-task-completed-toggle">
                        
                    </div>
                </div>
                <div className="email-task-overdue-box">
                    <div className="email-task-overdue-text">
                        <div className="email-task-overdue-header"></div>
                        <div className="email-task-overdue-para"></div>
                    </div>
                    <div className="email-task-overdue-toggle">
                        
                    </div>
                </div>
            </div>

        </div>
    )
}