import { useEffect, useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/TagsInput.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setNotesFilterValue } from "src/store/slices/filterByStatusSlice";


function TagsInput({ value, handleNoteInputChange }) {
    const [tags, setTags] = useState(value || []);
    const [inputValue, setInputValue] = useState('');
    const tagsFilterList = useSelector((state) => state.notes.tagsFilterList);
    const notesFilterByStatusValue = useSelector((state) => state.filterByStatus.notesFilterValue);
    const dispatch = useDispatch();


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

    function removeTag(tag, index) {
        setTags(tags.filter((_, i) => i !== index));
        const checkedTagsObj = Object.fromEntries(
            Object.entries(tagsFilterList).filter(([key, value]) => value == true)
        );
        if (checkedTagsObj[tag] == true) {
            dispatch (setNotesFilterValue( notesFilterByStatusValue - 1))
        }
       
    }
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    return (
        <div className="tags-input-container" 
        >
            {tags.map((tag, index) => (
                <div className="tag-item" key={index} style={{backgroundColor: 'var(--active-background-color)'}}>
                    <span className="text" style={{color: 'var(--primary-background-color)'}}>{tag}</span>
                    <span className="close" onClick={() => removeTag(tag, index)}>&times;</span>
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