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
        <div>
            { !onWholeScreen && (<a className='filter-button' onClick={ handleFilterOpen }>

                {onWholeScreen ? (<img src={filter} alt='filter-sign' className='filter-sign' />) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <img src={filter} alt='filter-btn' className='filter-sign' /> <div style={{ fontSize: '16px' }}>Filter</div>
                    </div>)}
            </a>)}
        </div>
    )
}

export default FilterButton;