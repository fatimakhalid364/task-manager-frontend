import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import BottomBar from 'src/components/BottomBar/BottomBar';
import MainDiv from "src/components/maindiv/maindiv";
import 'src/components/settings/settings.css';
import { Account } from 'src/components/settings/subComponents/Account';
import { General } from 'src/components/settings/subComponents/General';
import { Logout } from 'src/components/settings/subComponents/Logout';
import { Notification } from 'src/components/settings/subComponents/Notification';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import { useResponsive } from 'src/constants/media_queries';
import { useAuth } from 'src/contexts/AuthContext.jsx';
import { setColor } from 'src/store/slices/appearanceSlice';
import { setDateFormat, setTimeFormat } from 'src/store/slices/formatSlice';
import {
    updatePasswordThunk
} from "src/store/thunks/authThunks";
import { encryptObjectValues } from "src/utils/encryptionUtil";
import NotificationModal from '../notifications/NotificationModal';
import { errorToast } from '../toasters/toast';



function Settings({ currentSettingsScreen }) {
    const { logout } = useAuth();

    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const [isGeneralClicked, setIsGeneralClicked] = useState (true);
    const [isAccountClicked, setIsAccountClicked] = useState (false);
    const [isNotificationClicked, setIsNotificationClicked] = useState (false);
    const [isLogoutClicked, setIsLogoutClicked] = useState (false);
    const handleGeneralClick = () => {
        setIsGeneralClicked(true);
       
        setIsAccountClicked(false);
        setIsNotificationClicked(false);
        setIsLogoutClicked(false);
      
    }
    const handleNotificationClick = () => {
        setIsGeneralClicked(false);
       
        setIsAccountClicked(false);
        setIsNotificationClicked(true);
        setIsLogoutClicked(false);
      
    }
    const handleAccountClick = () => {
        setIsGeneralClicked(false);
       
        setIsAccountClicked(true);
        setIsNotificationClicked(false);
        setIsLogoutClicked(false);
      
    }
    const handleLogoutClick = () => {
        setIsGeneralClicked(false);
        setIsAccountClicked(false);
        setIsNotificationClicked(false);
        setIsLogoutClicked(true);
      
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const [isBlueClicked, setIsBlueClicked] = useState(false);
    const [isPinkClicked, setIsPinkClicked] = useState(false);
    const [isGreenClicked, setIsGreenClicked] = useState(false);
    const [isOrangeClicked, setIsOrangeClicked] = useState(false);
    const [allFalse, setAllFalse] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [timeFormatLocal, setTimeFormatLocal] = useState(useSelector((state) => state.format.timeFormat));
    const [dateFormatLocal, setDateFormatLocal] = useState(useSelector((state) => state.format.dateFormat));
    const [modalOpen, setModalOpen] = useState(false);
    const [changePassObj, setchangePassObj] = useState({
        oldPassword: "",
        newPassword: "",
        confPassword: "",
    });
    const updatePassObj = (name, value) => {
        setchangePassObj(prev => ({ ...prev, [name]: value }));
    };
    const handlePassInputChange = (event) => {
        const { name, value } = event.target;
        updatePassObj(name, value);
    }
    const updatePassword = () => {
        console.log("Password cahnge");
        setModalOpen(true)
    }
    const handleOkayPass = async () => {
        if (changePassObj.newPassword !== changePassObj.confPassword) {
            errorToast('New Password in both field is not same', 'pass-err')
        }
        const body = encryptObjectValues(changePassObj);

        const response = await dispatch(updatePasswordThunk(body));
        if (response.status === 200) {
            logout();
        } else {
            errorToast(response.message ?? "Something went wrong", 'pass-err');
        }
        console.log('Okay for password change')
        setModalOpen(false)

    }
    const handleCancel = () => {
        setModalOpen(false)
    }
    const handleDateFormat = (value) => {
        console.log(value)
        setDateFormatLocal(value);
    }
    const handleTimeFormat = (value) => {
        console.log(value)

        setTimeFormatLocal(value);
    }
    const handleBlueClick = () => {
        setIsBlueClicked(prevValue=> !prevValue);
        setSelectedColor('blue');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
      
    }

    const handlePinkClick = () => {
        setIsPinkClicked(prevValue=> !prevValue);
        setSelectedColor('pink');
        setAllFalse(false);
        setIsBlueClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
    }

    const handleGreenClick = () => {
        setIsGreenClicked(prevValue=> !prevValue);
        setSelectedColor('green');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsBlueClicked(false);
        setIsOrangeClicked(false);
    }

    const handleOrangeClick = () => {
        setIsOrangeClicked(prevValue=> !prevValue);
        setSelectedColor('orange');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsBlueClicked(false);
    }
    const handleSave = () => {
        console.log(changePassObj)
        if (changePassObj.newPassword && changePassObj.confPassword && changePassObj.oldPassword) {
            updatePassword();
        }
        dispatch(setColor(selectedColor));
        dispatch(setDateFormat(dateFormatLocal))
        dispatch(setTimeFormat(timeFormatLocal))
        setAllFalse(true);
        setIsOrangeClicked(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsBlueClicked(false);


    }


    return (
        <MainDiv>
            {modalOpen && <NotificationModal
                open={modalOpen}
                onOkay={handleOkayPass}
                onCancel={handleCancel}
                title={"You are goin to update you Password"}
                message={
                    "Once Changed you will be logged out and will be required to relogin with new password, If you cancel your other changes will be saved."
                }
                titleInfo={""}
                icon={WarningAmberIcon}
                primaryButtonText={"Update"}
                primaryButtonColor='info'
                secondaryButtonText={"Cancel"}
                secondaryButtonColor='info'
                notificationType={"UPDATE"}
                iconType={"WARNING"}
            />}
            <div className='settings-page-div' style={{marginBottom: isMicroScreen ? '95px' : '65px'}}>
                <SettingsHeader handleGeneralClick={handleGeneralClick} 
                handleNotificationClick={handleNotificationClick}
                handleAccountClick={handleAccountClick}
                handleLogoutClick={handleLogoutClick}
                isGeneralClicked = {isGeneralClicked}
                isAccountClicked = {isAccountClicked}
                isNotificationClicked = {isNotificationClicked}
                isLogoutClicked = {isLogoutClicked} />
              
                    { isGeneralClicked ? (<General
                        allFalse={allFalse}
                        handleDateFormat={handleDateFormat}
                        dateFormat={dateFormatLocal}
                        handleTimeFormat={handleTimeFormat}
                        timeFormat={timeFormatLocal}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        isBlueClicked = {isBlueClicked}
                        handleBlueClick = {handleBlueClick}
                        isPinkClicked = {isPinkClicked}
                        handlePinkClick = {handlePinkClick}
                        isOrangeClicked = {isOrangeClicked}
                        handleOrangeClick = {handleOrangeClick}
                        isGreenClicked = {isGreenClicked}
                        handleGreenClick = {handleGreenClick}/>
                ) : isAccountClicked ? (<Account changePassObj={changePassObj} handlePassInputChange={handlePassInputChange} />) : isNotificationClicked ? (<Notification />) : (<Logout />)
                }
                   
                { !isLogoutClicked && (<SettingsFooter
                    handleSave={handleSave}
                isBlueClicked = {isBlueClicked}
                handleBlueClick = {handleBlueClick}
                isPinkClicked = {isPinkClicked}
                handlePinkClick = {handlePinkClick}
                isOrangeClicked = {isOrangeClicked}
                handleOrangeClick = {handleOrangeClick}
                isGreenClicked = {isGreenClicked}
                handleGreenClick = {handleGreenClick}/>)}
            </div>
            { (!isAdaptableScreen && !isMicroScreen) && <BottomBar  />}
        </MainDiv>
    )
}

export default Settings;