import { FormControl, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { styled } from "@mui/system";
import { getCurrentTimeZone } from '../../../utils/basicUtils';
import whiteTick from 'src/assets/white-tick.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from 'src/store/slices/appearanceSlice';

const General= ({
    isBlueClicked, 
    handleBlueClick, 
    isPinkClicked, 
    handlePinkClick, 
    isOrangeClicked, 
    handleOrangeClick,
    isGreenClicked, 
    handleGreenClick,
}) => {
    // const [isBlueClicked, setIsBlueClicked] = useState(false);
    // const [isPinkClicked, setIsPinkClicked] = useState(false);
    // const [isGreenClicked, setIsGreenClicked] = useState(false);
    // const [isOrangeClicked, setIsOrangeClicked] = useState(false);
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
    }, [isBlueClicked, isPinkClicked, isGreenClicked, isOrangeClicked, dispatch]);

    // const handleBlueClick = () => {
    //     setIsBlueClicked(prevValue=> !prevValue);
    //     setIsPinkClicked(false);
    //     setIsGreenClicked(false);
    //     setIsOrangeClicked(false);
      
    // }

    // const handlePinkClick = () => {
    //     setIsPinkClicked(prevValue=> !prevValue);
    //     setIsBlueClicked(false);
    //     setIsGreenClicked(false);
    //     setIsOrangeClicked(false);
    // }

    // const handleGreenClick = () => {
    //     setIsGreenClicked(prevValue=> !prevValue);
    //     setIsPinkClicked(false);
    //     setIsBlueClicked(false);
    //     setIsOrangeClicked(false);
    // }

    // const handleOrangeClick = () => {
    //     setIsOrangeClicked(prevValue=> !prevValue);
    //     setIsPinkClicked(false);
    //     setIsGreenClicked(false);
    //     setIsBlueClicked(false);
    // }

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
                    <div className="select-language-text">
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0'}}>Language</div>
                        <div style={{width: '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px'}}>Select your preferred language for the app-interface. This will update all menu and text.</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '60.6%', marginLeft: '53px'}}>
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
                    <div className="select-d-and-t-format-text">
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0'}}>Date and Time Format</div>
                        <div style={{width: '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px'}}>Choose how date and time are displayed in the app, with options for date formats and 12-hour or 24-hour clock.</div>
                    </div>
                    <div className="select-d-and-t-format-inputs" style={{display: 'flex', flexDirection: 'column', width: '70%'}}>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)'}}>Select Date Format</div>
                        <FormControl fullWidth>
                                <CssSelectField
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
                                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                                    <MenuItem value="YYYY/MM/DD">YYYY/MM/DD</MenuItem>
                                </CssSelectField>
                        </FormControl>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)'}}>Select Time Format</div>
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
                                    <MenuItem value="12-HOUR">12-hour</MenuItem>
                                    <MenuItem value="24-HOUR">24-hour</MenuItem>
            
                                </CssSelectField>
                        </FormControl>
                        
                    </div>
                </div>
                <div className="time-zone-div">
                    <div className="time-zone-text" style={{width: '47%'}}>
                        <div style={{fontSize: '18px', color: 'var(--quaternary-font-color)', marginBottomm: '0'}}>Time Zone</div>
                        <div style={{width: '65%', fontSize: '14px', color: 'var(--tertiary-font-color)', marginTop: '7px'}}>Your current time zone is {getCurrentTimeZone()}.</div>
                    </div>
            
                </div>
                <div style={{height: '0', width: '100%', borderTop: '1px solid var(--field-border-color)', marginTop: '40px'}}></div>
                <div className="app-appearance-div">
                    <div className="app-appearance-header" style={{fontWeight: '600', fontSize: '20px', color: 'var(--quinary-font-color)'}}>Appearance</div>
                    <div className="app-appearance-content" style={{marginTop: '36px'}}>
                        <div className="app-appearance-text" style={{color: 'var(--quaternary-font-color)', fontSize: '18px', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Change Primary Color</div>
                        <div className="app-colors-div" style={{display: 'flex', flexDirection: 'column', gap: '20px', height: '70px'}}>
                            <div className='app-colors-text'>Select Color</div>
                                    <div className='app-colors-list' style={{display: 'flex', gap: '15px'}}>
                                        <div className={`app-color ${isBlueClicked ? 'no-animation blue-blast' : ''} blue-app`} onClick={handleBlueClick} >
                                            <div className={`animated-blue-circle ${isBlueClicked ? 'blue-outer-circle outer-circle' : ''}`}></div>
                                            { isBlueClicked && (<img src={whiteTick} alt='white-tick' style={{  top: '13px', left: '12px', position: 'absolute'}} />)}
                                        </div>
                                        <div className={`app-color ${isPinkClicked ? 'no-animation pink-blast' : ''} pink-app`} onClick={handlePinkClick}  >
                                            <div className={`animated-pink-circle ${isPinkClicked ? 'pink-outer-circle outer-circle' : ''}`}></div>
                                            { isPinkClicked && (<img src={whiteTick} alt='white-tick' style={{  top: '13px', left: '12px', position: 'absolute'}} />)}
                                        </div>
                                        <div className={`app-color ${isGreenClicked ? 'no-animation green-blast' : ''} green-app`} onClick={handleGreenClick}  >
                                            <div className={`animated-green-circle ${isGreenClicked ? 'green-outer-circle outer-circle' : ''}`}></div>
                                            { isGreenClicked && (<img src={whiteTick} alt='white-tick' style={{  top: '13px', left: '12px', position: 'absolute'}}/>)}
                                        </div>
                                        <div className={`app-color ${isOrangeClicked ? 'no-animation orange-blast' : ''} orange-app`} onClick={handleOrangeClick} style={{position: 'relative'}}  >
                                            <div className={`animated-orange-circle ${isOrangeClicked ? 'orange-outer-circle outer-circle' : ''}`} ></div>
                                            { isOrangeClicked && (<img src={whiteTick} alt='white-tick' style={{  top: '13px', left: '12px', position: 'absolute'}} />)}
                                        </div>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {General};