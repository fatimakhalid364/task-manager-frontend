import { useSelector } from 'react-redux';
import plus from 'src/assets/plus.svg';
import { useResponsive } from 'src/constants/media_queries';




function PageHeader({ handleOpen, total, text, object, filterDiv, showAdd = true, titleHead = '' , handleReverseTaskEdit}) {
    // const [metaData, setMetaData] = useState([]);
    // const specificValue = useSelector(state => state);
    // useEffect(() => {
    //     console.log('state:', specificValue);
    // }, []);
    const accentColor = useSelector((state) => state.appearance.color);

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
        isMicroScreen
    } = useResponsive();

    

    return (
    <div className='task-page-top'>
        <div className="task-page-top-header" style={{ marginLeft: (onWholeScreen && isAdaptableScreen) ? '16px' : !isAdaptableScreen ? '10px' : '' }}>
            <div className='all-tasks' style={{ fontSize: !isAdaptableScreen && '20px', marginLeft: isMicroScreen && '5px' }}>
                    {titleHead ? titleHead + " Priority Tasks" : text} 
            </div>
            <div className="number-of-tasks" style={{ fontSize: !isAdaptableScreen && '20px' }}>
                ({total})
            </div>
        </div>
            {(!onWholeScreen && showAdd) && (<div style={{ display: 'flex', gap: '20px' }}>
            { (filterDiv && !onWholeScreen) && (<div>{filterDiv}</div>)}
            <a className='primary-button' onClick={handleOpen} style={{ backgroundColor: 'var(--primary-background-color)'}}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <img src={plus} alt='plus-sign' className='plus-sign' /> <div style={{ fontSize: '16px' }}>Add {object}</div>
                    </div>
            </a>
        </div>)}
    </div>
    )
}

export default PageHeader;