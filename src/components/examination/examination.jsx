import {useState, useEffect} from 'react';


const Examination = () => {
    const objectsArray = [
        {
            name: 'Jane',
            location: 'Lahore'
        },
        {
            name: 'Irene',
            location: 'London'
        },
        {
            name: 'John',
            location: 'India'
        }
    ]

   const [isClicked, setIsClicked] = useState(false);
   const handleClick = ( ) => {
    setIsClicked(prevValue => !prevValue);
   }

   useEffect(() => {
    console.log(isClicked)
   }, [handleClick])
    return (
        <div>
            <button onClick = {handleClick} >Click Me!</button>
            {
                isClicked ? objectsArray.map((obj) => (
                    <div >
                        <div>Name</div>
                        <div>{obj.name}</div>
                        <div>Location</div>
                        <div>{obj.location}</div>
                    </div>
                    
                ))
                : <div style={{backgroundColor: 'orange', height: '30px', width: '30px'}}>
                    </div>
            }
        </div>
    )
}

export {Examination}