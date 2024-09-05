import { useEffect, useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/TagsInput.css';
import { useSelector } from 'react-redux';

function TagsInput({ value, handleNoteInputChange }) {
    const [tags, setTags] = useState(value || []);
    const [inputValue, setInputValue] = useState('');
    const accentColor = useSelector((state) => state.appearance.color);

    useEffect(() => {
        handleNoteInputChange({ target: { name: 'tags', value: tags } });
    }, [tags]);

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return;
        const value = e.target.value.trim();
        if (!value) return;
        if (tags.length >= 5) {
            alert('You can add only 5 tags.');
            return;
        }
        setTags([...tags, value]);
        setInputValue(''); 
    }

    function removeTag(index) {
        setTags(tags.filter((_, i) => i !== index));
    }
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    return (
        <div className="tags-input-container" 
        >
            {tags.map((tag, index) => (
                <div className="tag-item" key={index} style={{backgroundColor: accentColor === 'pink' ? 'var(--light-pink-color)'
                    : accentColor === 'green' ? 'var(--light-green-color)'
                    : accentColor === 'orange' ? 'var(--light-orange-color)'
                    : 'var(--active-background-color)'}}>
                    <span className="text" style={{color: accentColor === 'pink' ? 'var(--pink-accent-color)'
                    : accentColor === 'green' ? 'var(--green-accent-color)'
                    : accentColor === 'orange' ? 'var(--orange-accent-color)'
                    : 'var(--primary-background-color)'}}>{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            <input
                type="text"
                className="tags-input"
                placeholder="Type here"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                value={inputValue}
                name='tags'
            />
        </div>
    )
}

export default TagsInput