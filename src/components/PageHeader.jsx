import { useSelector } from 'react-redux';
import { useResponsive } from 'src/constants/media_queries';
import { useState } from 'react';
import { useEffect } from 'react';
import plus from 'src/assets/plus.svg';



function PageHeader({ handleOpen, total, text, object, filterDiv}){
    // const [metaData, setMetaData] = useState([]);
    const specificValue = useSelector(state => state);
    useEffect(() => {
        console.log('state:', specificValue);
    }, []);

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        onWholeScreen,
        isBp6,
        isBp8,
    } = useResponsive();

    return (
    <div className='task-page-top'>
        <div className="task-page-top-header" style={{ marginLeft: onWholeScreen && '16px' }}>
            <div className='all-tasks' style={{ fontSize: !isAdaptableScreen && '20px' }}>
                { text } 
            </div>
            <div className="number-of-tasks" style={{ fontSize: !isAdaptableScreen && '20px' }}>
                ({total})
            </div>
        </div>
        <div style={{display: 'flex', gap: '20px'}}>
            { filterDiv && (<div>{filterDiv}</div>)}
            <a className='primary-button' onClick={handleOpen} style={{
                borderRadius: (onWholeScreen) && '50%',
                height: (onWholeScreen) && '40px',
                width: (onWholeScreen) && '40px',
                position: (onWholeScreen) && 'absolute',
                bottom: (onWholeScreen) && '20px',
                left: (onWholeScreen) && '46%'
            }}>

                {onWholeScreen ? (<img src={plus} alt='plus-sign' className='plus-sign' />) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <img src={plus} alt='plus-sign' className='plus-sign' /> <div style={{ fontSize: '16px' }}>Add {object}</div>
                    </div>)}
            </a>
        </div>
    </div>
    )
}

export default PageHeader;