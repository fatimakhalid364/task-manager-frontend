import { FormControl, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { styled } from "@mui/system";
import { getCurrentTimeZone } from '../../../utils/basicUtils';

const General= () => {

    const CssSelectField = styled((props) => <Select {...props} />)(({ theme }) => ({
        '& .MuiSelect-select': {
            '&:hover fieldset': {
                border: `1px solid #3B8AFF`,
            },
            '&.Mui-focused fieldset': {
                border: `2px solid #3B8AFF`,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #D1D5DB',
            },
        },
        '& .MuiOutlinedInput-root': {
    
            '&:hover fieldset': {
                border: `1px solid #3B8AFF`,
            },
            '&.Mui-focused fieldset': {
                border: `2px solid #3B8AFF`,
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
                    <div style={{display: 'flex', flexDirection: 'column', width: '55%'}}>
                        <div  style={{fontFamily: 'var(--secondary-font-family)', fontSize: '14px', fontWeight: '500', color: 'var(--primary-font-color)'}}>Select Language</div>
            
                        <FormControl fullWidth>
                                <CssSelectField
                                    sx={{
                                        height: '40px',
                                        marginTop: '8px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: `1px solid #3B8AFF`,

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
                                                border: `1px solid #3B8AFF`,

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
                                                border: `1px solid #3B8AFF`,

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
                                        <div className="app-color blue-app"></div>
                                        <div className="app-color pink-app"></div>
                                        <div className="app-color green-app"></div>
                                        <div className="app-color orange-app"></div>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default General;