import { FormControl, MenuItem, Select } from '@mui/material';
import { styled } from "@mui/system";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import whiteTick from 'src/assets/white-tick.svg';
import { setColor } from 'src/store/slices/appearanceSlice';
import { getCurrentTimeZone } from '../../../utils/basicUtils';
import { useResponsive } from 'src/constants/media_queries';

const General= ({
    allFalse,
    handleTimeFormat,
    timeFormat,
    handleDateFormat,
    dateFormat,
    isBlueClicked, 
    handleBlueClick, 
    isPinkClicked, 
    handlePinkClick, 
    isOrangeClicked, 
    handleOrangeClick,
    isGreenClicked, 
    handleGreenClick,
}) => {
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const dispatch = useDispatch();

    useEffect(() => {
        switch (true) {
            case isBlueClicked:
                dispatch(setColor('blue'));
                break;
            case isPinkClicked:
                dispatch(setColor('pink'));
                break;
            case isGreenClicked:
                dispatch(setColor('green'));
                break;
            case isOrangeClicked:
                dispatch(setColor('orange'));
                break;
        }
    }, [dispatch]);

    const accentColor = useSelector((state) => state.appearance.color);

    const CssSelectField = styled((props) => <Select {...props} />)(({ theme }) => ({
        '& .MuiSelect-select': {
            '&:hover fieldset': {
                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,
            },
            '&.Mui-focused fieldset': {
                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #D1D5DB',
            },
        },
        '& .MuiOutlinedInput-root': {
    
            '&:hover fieldset': {
                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,
            },
            '&.Mui-focused fieldset': {
                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #D1D5DB',
            },
            height: '40px',
            borderRadius: '8px',
            padding: '4px',
            '& input': {
                padding: '4px',
            },
        },
        borderRadius: '8px',
    
    }));
    return (
        <>
            <div className="general-page-content">
                <div className="select-language-div">
                    { !isMicroScreen && (<div className="select-language-text">
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0'}}>Language</div>
                        <div style={{width: '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px'}}>Select your preferred language for the app-interface. This will update all menu and text.</div>
                    </div>)}
                    <div style={{display: 'flex', flexDirection: 'column', width: isMicroScreen ? '95%' : '60.6%',  marginLeft: isMicroScreen ? '0' : '53px'}}>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)'}}>Select Language</div>
            
                        <FormControl fullWidth>
                                <CssSelectField
                                    sx={{
                                        height: '40px',
                                        marginTop: '8px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,

                                            }
                                        }
                                    }}
                                
                                >
                                    <MenuItem value="ENGLISH">English</MenuItem>
                                    <MenuItem value="SPANISH">Spanish</MenuItem>
                                    <MenuItem value="FRENCH">French</MenuItem>
                                    <MenuItem value="URDU">Urdu</MenuItem>
                                </CssSelectField>
                        </FormControl>
                    </div>
                </div>
                <div className="select-d-and-t-format-div">
                    {!isMicroScreen && (<div className="select-d-and-t-format-text">
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0'}}>Date and Time Format</div>
                        <div style={{width: '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px'}}>Choose how date and time are displayed in the app, with options for date formats and 12-hour or 24-hour clock.</div>
                    </div>)}
                    <div className="select-d-and-t-format-inputs" style={{display: 'flex', flexDirection: 'column', width: isMicroScreen ? '95%' : '70%'}}>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)'}}>Select Date Format</div>
                        <FormControl fullWidth>
                                <CssSelectField
                                onChange={(e) => handleDateFormat(e.target.value)}
                                value={dateFormat}
                                    sx={{
                                        height: '40px',
                                        marginTop: '8px',
                                        marginBottom: '20px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,

                                            }
                                        }
                                    }}
                                
                                >
                                <MenuItem value="MMM dd yyyy">MM DD YYYY</MenuItem>
                                <MenuItem value="dd MMM yyyy">DD MM YYYY</MenuItem>
                                <MenuItem value="MMM/dd/yyyy">MM/DD/YYYY</MenuItem>
                                <MenuItem value="dd/MMM/yyyy">DD/MM/YYYY</MenuItem>
                                </CssSelectField>
                        </FormControl>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)', marginTop: isMicroScreen && '18px'}}>Select Time Format</div>
                        <FormControl fullWidth>
                                <CssSelectField
                                value={timeFormat}
                                onChange={(e) => handleTimeFormat(e.target.value)}
                                    sx={{
                                        height: '40px',
                                        marginTop: '8px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: `1px solid ${accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'}`,

                                            }
                                        }
                                    }}
                                
                                >
                                <MenuItem value="hh:mm a">12-hour</MenuItem>
                                <MenuItem value="hh:mm">24-hour</MenuItem>
            
                                </CssSelectField>
                        </FormControl>
                        
                    </div>
                </div>
                <div className="time-zone-div" style={{ marginLeft: isMicroScreen && '0'}}>
                    <div className="time-zone-text" style={{width: isMicroScreen ? '87%' : '47%', display: isMicroScreen && 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0', marginLeft: isMicroScreen && '4%'}}>Time Zone</div>
                        <div style={{width: isMicroScreen ? '100%' : '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px', marginLeft: isMicroScreen && '24.7%'}}>Your current time zone is {getCurrentTimeZone()}.</div>
                    </div>
            
                </div>
                <div style={{height: '0', width: '100%', borderTop: '1px solid var(--field-border-color)', marginTop: '40px'}}></div>
                <div className="app-appearance-div">
                    <div className="app-appearance-header" style={{fontWeight: '600', fontSize: '20px', color: 'var(--quinary-font-color)', marginLeft: isMicroScreen && '30%'}}>Appearance</div>
                    <div className="app-appearance-content" style={{marginTop: '36px'}}>
                        { !isMicroScreen && (<div className="app-appearance-text" style={{color: 'var(--quaternary-font-color)', fontSize: '18px', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Change Primary Color</div>)}
                        <div className="app-colors-div" style={{display: 'flex', flexDirection: 'column', gap: '20px', height: '70px'}}>
                            <div className='app-colors-text' style={{marginLeft: isMicroScreen && '57%', width: isMicroScreen && '100%'}}>Select Color</div>
                                    <div className='app-colors-list' style={{display: 'flex', gap: '15px', marginLeft: isMicroScreen && '30%', width: isMicroScreen && '100%'}}>
                                        <div className={`app-color ${(isBlueClicked || accentColor == 'blue') ? 'no-animation blue-blast' : ''} blue-app`} onClick={handleBlueClick} >
                                            <div className={`animated-blue-circle ${(isBlueClicked || accentColor == 'blue') ? 'blue-outer-circle outer-circle' : ''}`}></div>
                                    {(allFalse && accentColor == 'blue') ? <img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} /> : isBlueClicked && (<img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} />)}
                                        </div>
                                        <div className={`app-color ${(isPinkClicked || accentColor == 'pink') ? 'no-animation pink-blast' : ''} pink-app`} onClick={handlePinkClick}  >
                                            <div className={`animated-pink-circle ${(isPinkClicked || accentColor == 'pink') ? 'pink-outer-circle outer-circle' : ''}`}></div>
                                    {(allFalse && accentColor == 'pink') ? <img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} /> : isPinkClicked && (<img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} />)}
                                </div>
                                        <div className={`app-color ${(isGreenClicked || accentColor == 'green') ? 'no-animation green-blast' : ''} green-app`} onClick={handleGreenClick}  >
                                            <div className={`animated-green-circle ${(isGreenClicked || accentColor == 'green')? 'green-outer-circle outer-circle' : ''}`}></div>
                                    {(allFalse && accentColor == 'green') ? <img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} /> : isGreenClicked && (<img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} />)}
                                </div>
                                        <div className={`app-color ${(isOrangeClicked || accentColor == 'orange') ? 'no-animation orange-blast' : ''} orange-app`} onClick={handleOrangeClick} style={{position: 'relative'}}  >
                                            <div className={`animated-orange-circle ${(isOrangeClicked || accentColor == 'orange')  ? 'orange-outer-circle outer-circle' : ''}`} ></div>
                                    {(allFalse && accentColor == 'orange') ? <img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} /> : isOrangeClicked && (<img src={whiteTick} alt='white-tick' style={{ top: '13px', left: '12px', position: 'absolute' }} />)}
                                </div>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { General };

