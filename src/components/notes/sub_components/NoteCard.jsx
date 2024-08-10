import { useEffect, useRef, useState } from 'react';
import visibility from 'src/assets/eye.svg';
import paperClip from 'src/assets/paper-clip.svg';
import pin from 'src/assets/pin.svg';
import trash from 'src/assets/trash.svg';
import 'src/components/notes/sub_components/NoteCard.css';

const NoteCard = ({ title, desc, links, date, hide, pinning, tags = [], id }) => {
    const [pinned, setPinned] = useState(pinning ? pinning : false);
    const [showAllTags, setShowAllTags] = useState(false);
    const containerRef = useRef(null);
    const [visibleTags, setVisibleTags] = useState(tags);
    const [hiddenTagCount, setHiddenTagCount] = useState(0);

    useEffect(() => {
        if (containerRef.current && !showAllTags) {
            const containerWidth = containerRef.current.offsetWidth;
            let totalWidth = 0;
            let visibleTagsCount = 0;

            const tagElements = containerRef.current.children;
            if (tagElements.length > 0) {
                for (let i = 0; i < tagElements.length; i++) {
                    const tagWidth = tagElements[i].offsetWidth;
                    if (totalWidth + tagWidth < containerWidth) {
                        totalWidth += tagWidth + 8; // 8 is the gap between tags
                        visibleTagsCount++;
                    } else {
                        break;
                    }
                }
            }

            setVisibleTags(tags.slice(0, visibleTagsCount));
            setHiddenTagCount(tags.length - visibleTagsCount);
        }
    }, [tags, containerRef, showAllTags]);

    const handlePinnedClick = () => {
        setPinned(prevValue => !prevValue);
    };

    return (
        <div className='note-card-div' style={{ borderBottom: pinned === 'PINNED' ? '4px solid var(--primary-background-color)' : undefined }}>
            <div className='note-card'>
                <div className='note-title'>{title}</div>
                <div className='note-description'>{desc}</div>
                <div className={`note-tag-container ${showAllTags ? 'scrollable' : ''}`} ref={containerRef}>
                    {visibleTags.map((tag, index) => (
                        <div key={index} className='note-tag'>{tag}</div>
                    ))}
                    {hiddenTagCount > 0 && !showAllTags && (
                        <div className='show-more-button' onClick={() => setShowAllTags(true)}>
                            +{hiddenTagCount}
                        </div>
                    )}
                    {showAllTags && tags.slice(visibleTags.length).map((tag, index) => (
                        <div key={visibleTags.length + index} className='note-tag'>{tag}</div>
                    ))}
                </div>
                <div className='reference-div'>
                    <div className='reference-div-header'>
                        <img src={paperClip} alt='paper-clip' />
                        <div>Reference Links:</div>
                    </div>
                    <div className='note-ref-links'>
                        {links.join(' , ')}
                    </div>
                </div>   
                <div className='note-footer'>
                    <div className='note-date'>
                        {date.toLocaleDateString()}
                    </div>
                    <div className='note-icons-div'>
                        <div className='note-icons' onClick={handlePinnedClick} style={{ backgroundColor: pinned === 'PINNED' ? 'var(--active-background-color)' : undefined }}>
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
