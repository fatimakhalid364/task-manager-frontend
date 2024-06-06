function CheckBox(){
    return(
        <div className='checkbox'>
            <input type='checkbox' id='checkbox' name='checkbox' value='terms-and-conditions' />
            <label htmlFor='checkbox'>I agree <a href='https://localhost:3000/terms-and-services'>Terms & Conditions</a></label>
        </div>
    )
}

export default CheckBox;