import 'src/components/notes/sub_components/NoteCard.css';
import paperClip from 'src/assets/paper-clip.svg';
import pin from 'src/assets/pin.svg';
import visibility from 'src/assets/eye.svg';
import trash from 'src/assets/trash.svg';
import { useState } from 'react';

const NoteCard = ({ title, desc, links, date, hide, tag}) => {
    const [pinned, setPinned] = useState(false);

    const handlePinnedClick = () => {
        setPinned(prevValue=> !prevValue);
    }
    return (
        <div className='note-card-div' style={{borderBottom: pinned && '4px solid var(--primary-background-color)' }}>
            <div className='note-card'>
                <div className='note-title'>{title}</div>
                <div className='note-description'>{desc}</div>
                <div className='note-tag'>{tag}</div>
                <div className='reference-div'>
                    <div className='reference-div-header'>
                        <img src={paperClip} alt='paper-clip' />
                        <div>Reference Links:</div>
                    </div>
                    <div className='note-ref-links'>
                        {links.join(', ')}
                    </div>
                </div>   
                <div className='note-footer'>
                    <div className='note-date'>
                        {date.toLocaleDateString()}
                    </div>
                    <div className='note-icons-div'>
                        <div className='note-icons' onClick={handlePinnedClick} style={{backgroundColor: pinned && 'var(--active-background-color)'}}>
                            <img src={pin} alt='pin-icon' />
                        </div>
                        <div className='note-icons'>
                            <img src={visibility} alt='visibility-icon' />
                        </div>
                        <div className='note-icons'>
                            <img src={trash} alt='trash-icon' />
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
};

export default NoteCard;
