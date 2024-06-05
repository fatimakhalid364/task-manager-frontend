
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Screen } from "src/constants/constants";
function InputFields({ currentScreen }) {

    console.log('Inside input fields current screen ', currentScreen);
    const [userAccount, setUserAccount] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleInputChange(event){
        const {value, name} = event.target;
        setUserAccount((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            };
        });
        console.log(userAccount);
    }


    return(
        <div className='signup-input-fields'>
            {currentScreen === Screen.signup &&
                <div>
                    <div className='input-header'>Name</div>
                    <input onChange={handleInputChange} type='text' name='name' value={userAccount.name} placeholder='enter name' className='input-field' />
                </div>
            }
            <div className='input-header'>Email</div>
            <input onChange={handleInputChange} type='text' name='email' value={userAccount.email} placeholder='enter email' className='input-field'/>
            <div className='input-header'>Password</div>
            <input onChange={handleInputChange} type='text' name='password' value={userAccount.password} placeholder='enter password' className='input-field'/>
            {currentScreen === Screen.signup &&
                <div>
                    <div className='input-header'>Confirm Password</div>
                    <input onChange={handleInputChange} type='text' name='confirmPassword' value={userAccount.confirmPassword} placeholder='re-enter password' className='input-field' />
                </div>
            }
        </div>
        
    )
}

InputFields.propTypes = {
    currentScreen: PropTypes.oneOf([Screen.SIGNUP, Screen.SIGNIN, Screen.FORGOT_PASS, Screen.SET_PASS]),
};


export default InputFields;