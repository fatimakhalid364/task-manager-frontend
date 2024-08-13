import plus from 'src/assets/add-notes.svg';
import 'src/components/notes/sub_components/create_notes/CreateNotes.css';
import RichTextEditor from 'src/components/notes/sub_components/create_notes/subComponents/RichTextEditor';
import AttachFileIcon from 'src/components/icons/AttachFileIcon';
import { useState } from 'react';
import TagIcon from 'src/components/icons/TagIcon';

const CreateNotes = ({  handleCreateNotesClick }) => {

    const [attachLinkClicked, setAttachLinkClicked] = useState(false);

    const handleAttachLinkClick = () => {
        setAttachLinkClicked(prevValue => !prevValue);
        setAddTagClicked(false);
    };

    const [addTagClicked, setAddTagClicked] = useState(false);

    const handleAddTagClick = () => {
        setAddTagClicked(prevValue => !prevValue);
        setAttachLinkClicked(false);
    };

    return (
        <div className="add-notes-page">
            <div className="add-notes-header-div">
                <div className="add-notes-header">
                    <div>
                        <img src={plus} alt='plus-sign' />
                    </div>
                    <div>
                        Add Note
                    </div>
                </div>
                
            </div>
            <div className="add-notes-input-fields">
                    <div className="add-notes-input-title">
                        <div style={{fontSize: '16px', fontFamily: 'var(--secondary-font-family)', color: 'var(--secondary-font-color)', fontWeight: '500'}}>
                            Title
                        </div>
                        <input type="text" name="title" placeholder='Enter title here'  className='create-notes-input' />
                    </div>
                    <div className="add-notes-input-details">
                        <RichTextEditor />
                        <div className='note-attachments-div'> 
                            <div className='note-attachments note-attachments-a' onClick={ handleAttachLinkClick } style={{color: attachLinkClicked && 'var(--primary-background-color)', backgroundColor: attachLinkClicked && 'var(--active-background-color)'}}>
                                <AttachFileIcon  color={attachLinkClicked ? 'var(--primary-background-color)' : 'var(--tertiary-font-color)'}/>
                                <div>Attach Link</div>
                            </div>
                            <div className='note-attachments note-attachments-b' onClick={ handleAddTagClick } style={{color: addTagClicked && 'var(--primary-background-color)', backgroundColor: addTagClicked && 'var(--active-background-color)'}}>
                                <TagIcon color={addTagClicked ? 'var(--primary-background-color)' : 'var(--tertiary-font-color)'}/>
                                Add Tag
                            </div>
                        </div>
                    </div>
            </div>
            <div className="add-notes-controls">
                <button className='filter-button' style={{width: '120px', backgroundColor: 'var(--neutral-background-color)', border: '1px solid var(--field-border-color)', color: 'var(--tertiary-font-color)'}}
                    onClick = {  handleCreateNotesClick }>Cancel</button>
                <button className='primary-button' style={{width: '135px', gap: '0px'}}>Save Note</button>
                
            </div>
        </div>
    )
}

export default CreateNotes;