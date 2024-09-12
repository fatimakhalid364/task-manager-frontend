import Switch from '@mui/material/Switch';
import { useResponsive } from 'src/constants/media_queries';
import { styled } from '@mui/material/styles';
const Notification = () => {
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const StyledSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'var(--primary-background-color)',
          '&:hover': {
            backgroundColor: 'var(--active-background-color)',
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'var(--active-background-color)',
        },
      }));
    return (
        <>
        <div className='settings-notifications-div'>
            { !isMicroScreen && (<div className="email-notifications-div">
                <div className="email-notifictions-text">
                    <div className="email-notifications-header" style={{fontFamily: 'var(--primary-font-family)', fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottom: '10px'}}>Email Notifications</div>
                    <div className="email-notifications-para" style={{width: '290px', fontFamily: 'var(--primary-font-family)', fontSize: '14px', color: 'var(--tertiary-font-color)'}}>Get emails to find out what's going on when you are not online.</div>
                </div>
            </div>)}
            <div className="email-notifications-toggles" style={{width: isMicroScreen ? '95%' : '67%'}}>
                <div className="email-task-due-box">
                    <div className="email-task-due-text">
                        <div className="email-task-due-header">Task Due</div>
                        <div className="email-task-due-para">Get email when a task is due soon.</div>
                    </div>
                    <div className="email-task-due-toggle">
                    <StyledSwitch />
                    </div>
                </div>
              
                <div className="email-task-completed-box">
                    <div className="email-task-completed-text">
                        <div className="email-task-completed-header">Task Completed</div>
                        <div className="email-task-completed-para">Get email when a task is marked as complete.</div>
                    </div>
                    <div className="email-task-completed-toggle">
                        <StyledSwitch />
                    </div>
                </div>
                <div className="email-task-overdue-box">
                    <div className="email-task-overdue-text" >
                        <div className="email-task-overdue-header">Task Overdue</div>
                        <div className="email-task-overdue-para">Get email when a task is overdue.</div>
                    </div>
                    <div className="email-task-overdue-toggle">
                        <StyledSwitch />
                    </div>
                </div>
            </div>
            
            

        </div>
         <div className='settings-notifications-div'>
         { !isMicroScreen && (<div className="email-notifications-div">
             <div className="email-notifictions-text">
                 <div className="email-notifications-header" style={{fontFamily: 'var(--primary-font-family)', fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottom: '10px'}}>Push Notifications</div>
                 <div className="email-notifications-para" style={{width: '290px', fontFamily: 'var(--primary-font-family)', fontSize: '14px', color: 'var(--tertiary-font-color)'}}>Get push notifications to find out what's going on when you are not online.</div>
             </div>
         </div>)}
         <div className="email-notifications-toggles" style={{width: isMicroScreen ? '95%' : '67%'}}>
             <div className="email-task-due-box">
                 <div className="email-task-due-text">
                     <div className="email-task-due-header">Task Due</div>
                     <div className="email-task-due-para">Get notified when a task is due soon.</div>
                 </div>
                 <div className="email-task-due-toggle">
                 <StyledSwitch />
                 </div>
             </div>
           
             <div className="email-task-completed-box">
                 <div className="email-task-completed-text">
                     <div className="email-task-completed-header">Task Completed</div>
                     <div className="email-task-completed-para">Get notified when a task is marked as complete.</div>
                 </div>
                 <div className="email-task-completed-toggle">
                     <StyledSwitch  />
                 </div>
             </div>
             <div className="email-task-overdue-box">
                 <div className="email-task-overdue-text" >
                     <div className="email-task-overdue-header">Task Overdue</div>
                     <div className="email-task-overdue-para">Get notified when a task is overdue.</div>
                 </div>
                 <div className="email-task-overdue-toggle">
                     <StyledSwitch />
                 </div>
             </div>
         </div>
         
         

     </div>
     </>
    )
}

export { Notification}