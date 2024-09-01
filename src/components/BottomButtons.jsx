import { useResponsive } from 'src/constants/media_queries';
import plus from 'src/assets/plus.svg';
import filter from 'src/assets/filter.svg';
import { useSelector } from 'react-redux';

const BottomButtons= ({ handleOpen, handleFilterOpen, doubleArrowClicked}) => {
    const accentColor = useSelector((state) => state.appearance.color)
    const {
        onWholeScreen,
        isAdaptableScreen

    } = useResponsive();


    return (
        <div>
        {(onWholeScreen && isAdaptableScreen) && (
            <div style={{display: 'flex', 
                position: 'absolute',
                height: '40px',
                bottom: '1px',
                left: '46%',
                gap: '10px',
               
                }}>
                <a className='primary-button' onClick={handleOpen} style={{
                    borderRadius: '50%',
                    height: '40px',
                    width: '40px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    backgroundColor: accentColor === 'pink'
                        ? 'var(--pink-accent-color)'
                        : accentColor === 'green'
                        ? 'var(--green-accent-color)'
                        : accentColor === 'orange'
                        ? 'var(--orange-accent-color)'
                        : 'var(--primary-background-color)'
                 
                   }}>

                    <img src={plus} alt='plus-sign' className='plus-sign' />
                </a>
                <a className='filter-button' onClick={ handleFilterOpen }
        style={{
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            
           
        }}>

            <img src={filter} alt='filter-sign' className='filter-sign' />
            </a>
        

            </div>)}

        </div>
    )
}

export default BottomButtons;

