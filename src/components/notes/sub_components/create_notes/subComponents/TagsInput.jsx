import { useEffect, useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/TagsInput.css';

function TagsInput({ value, handleNoteInputChange }) {
    const [tags, setTags] = useState(value || []);
    const [inputValue, setInputValue] = useState('');

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
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
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