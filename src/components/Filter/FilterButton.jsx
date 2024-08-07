import filter from 'src/assets/filter.svg';
import 'src/components/Filter/FilterButton.css';
import { useResponsive } from 'src/constants/media_queries';

const FilterButton = ({ handleFilterOpen }) => {
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
        <a className='filter-button' onClick={ handleFilterOpen }
        style={{
            borderRadius: (onWholeScreen) && '50%',
            height: (onWholeScreen) && '40px',
            width: (onWholeScreen) && '40px',
            position: (onWholeScreen) && 'absolute',
            bottom: (onWholeScreen) && '20px',
            left: (onWholeScreen) && '46%'
        }}>

            {onWholeScreen ? (<img src={filter} alt='filter-sign' className='filter-sign' />) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                    <img src={filter} alt='filter-btn' className='filter-sign' /> <div style={{ fontSize: '16px' }}>Filter</div>
                </div>)}
        </a>
    )
}

export default FilterButton;