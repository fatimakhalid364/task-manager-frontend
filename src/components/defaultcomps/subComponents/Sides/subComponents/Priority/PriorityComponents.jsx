import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useResponsive } from 'src/constants/media_queries';



function PriorityComponents({ Dot, PriorityLevel, TasksAtPriorityLevel, burgerMenuClicked, url, style  }) {
    const navigate = useNavigate();
    const lang = useSelector((state) => state.format.language);

    const {
        expandBar,
        isMicroScreen
    } = useResponsive();

   
    const priorityColorMap = {
        ENGLISH: {
            High: '#EF4444',
            Medium: '#F59E0B',
            Low: '#1FDE43'
        },
        SPANISH: {
            Alto: '#EF4444', // High
            Medio: '#F59E0B', // Medium
            Bajo: '#1FDE43'   // Low
        },
        FRENCH: {
            Élevé: '#EF4444', // High
            Moyen: '#F59E0B', // Medium
            Bas: '#1FDE43'    // Low
        },
        URDU: {
            اعلی: '#EF4444', // High
            درمیانہ: '#F59E0B', // Medium
            کم: '#1FDE43'      // Low
        }
    };

    // Example of how to use the priorityColorMap
    const getPriorityColor = (PriorityLevel, selectedLanguage) => {
        const priorityMap = priorityColorMap[selectedLanguage];

        return priorityMap[PriorityLevel] || '#000000'; // Fallback color if not found
    };





    const priorityColor = getPriorityColor(PriorityLevel, lang)
    // const priorityColor = PriorityLevel === 'High' ? '#EF4444' : PriorityLevel === 'Medium' ? '#F59E0B' : '#1FDE43'

    useEffect(() => {
        console.log('burgerMenuClicked', burgerMenuClicked);
      }, [burgerMenuClicked]);
    
    return (
        <div >
        {((expandBar && burgerMenuClicked) || (isMicroScreen && burgerMenuClicked)) ? (<div className='tasks-page-priority'
        style={{marginLeft: (isMicroScreen && burgerMenuClicked && !expandBar) && '20px'}}>
            <div>
                <img src={Dot} alt='colored-dots' />

            </div>
                <div 
                onClick={() => { navigate(url) }} 
                className='tasks-page-priority-level'
                style={style}
                >
                    {PriorityLevel}
            </div>
            <div className='tasks-page-number' style={{backgroundColor: 'var(--active-background-color)'}}>
                    {TasksAtPriorityLevel}
            </div>
            </div>) : (<div className='tasks-page-number' style={{ marginLeft: '13px', position: 'relative', marginBottom: '12px', color: `${priorityColor}`, backgroundColor: 'var(--neutral-background-color)', fontSize: '14px' }}>
                    {TasksAtPriorityLevel}
            </div>)}
        </div>
    )
}

PriorityComponents.propTypes = {
    Dot: propTypes.string.isRequired,
    PriorityLevel: propTypes.string.isRequired,
    TasksAtPriorityLevel: propTypes.string.isRequired,
    burgerMenuClicked: propTypes.bool,
 }

export default PriorityComponents;