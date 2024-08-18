import { useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/TagsInput.css';

function TagsInput(){
    const [tags, setTags] = useState([])

    function handleKeyDown(e) {
        
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        if (tags.length >= 5) {
            alert('You can add only 5 tags.');
            return; 
        }
        setTags([...tags, value.trim()]);
        e.target.value = '';
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type here" name='tags' value={tags} />
        </div>
    )
}

export default TagsInput