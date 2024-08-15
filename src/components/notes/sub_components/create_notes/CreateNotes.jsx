import plus from 'src/assets/add-notes.svg';
import 'src/components/notes/sub_components/create_notes/CreateNotes.css';
import RichTextEditor from 'src/components/notes/sub_components/create_notes/subComponents/RichTextEditor';
import AttachFileIcon from 'src/components/icons/AttachFileIcon';
import { useState } from 'react';
import TagIcon from 'src/components/icons/TagIcon';
import ApplyLinkModal from './subComponents/ApplyLinkModal';
import TagsInput from 'src/components/notes/sub_components/create_notes/subComponents/TagsInput';

const CreateNotes = ({  handleCreateNotesClick }) => {

    const [attachLinkClicked, setAttachLinkClicked] = useState(false);
    const [showLinkPopup, setShowLinkPopup] = useState(false);
    const handleShowLinkPopup = () => setShowLinkPopup(true);
    
    const handleAttachLinkClick = () => {
        setAttachLinkClicked(prevValue => !prevValue);
        // setAddTagClicked(false);
        if(!attachLinkClicked) {
            handleShowLinkPopup();
        } 
    };

    const handleCloseLinkPopup = () => {
        setShowLinkPopup(false);
        handleAttachLinkClick();
    };

    const [addTagClicked, setAddTagClicked] = useState(false);

    const handleAddTagClick = () => {
        setAddTagClicked(prevValue => !prevValue);
        // setAttachLinkClicked(false);
    };

    const [noteDetails, setNoteDetails] = useState({
        title: "",
        desc: "something",
        links: [],
        tags: []
    });

    const handleNoteInputChange = (event) => {
        const { value, name } = event.target;
        setNoteDetails(prev => ({ ...prev, [name]: value }));
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
            <form className="add-notes-input-fields">
                    <div className="add-notes-input-title">
                        <div style={{fontSize: '16px', fontFamily: 'var(--secondary-font-family)', color: 'var(--secondary-font-color)', fontWeight: '500'}}>
                            Title
                        </div>
                        <input type="text" name="title" placeholder='Enter title here'  className='create-notes-input' value={noteDetails.title} />
                    </div>
                    <div className="add-notes-input-details">
                        <RichTextEditor showLinkPopup={ showLinkPopup } 
                                        handleShowLinkPopup={ handleShowLinkPopup }  
                                        handleCloseLinkPopup={  handleCloseLinkPopup } 
                                        handleAttachLikClick={ handleAttachLinkClick }
                                        handleNoteInputChange={ handleNoteInputChange}
                                        value={noteDetails.links} />
                        <div className='note-attachments-div'> 
                            <div className='note-attachments note-attachments-a' onClick={ handleAttachLinkClick } style={{color: attachLinkClicked && 'var(--primary-background-color)', backgroundColor: attachLinkClicked && 'var(--active-background-color)'}}>
                                <AttachFileIcon  color={attachLinkClicked ? 'var(--primary-background-color)' : 'var(--tertiary-font-color)'}/>
                                <div>Attach Link</div>
                            </div>
                            <div className='note-attachments note-attachments-b' onClick={ handleAddTagClick } style={{color: addTagClicked && 'var(--primary-background-color)', backgroundColor: addTagClicked && 'var(--active-background-color)'}}>
                                <TagIcon color={addTagClicked ? 'var(--primary-background-color)' : 'var(--tertiary-font-color)'}/>
                                Add Tag
                            </div>
                            {addTagClicked && (<TagsInput value={noteDetails.tags} />)}
                        </div>
                    </div>
            </form>
            <div className="add-notes-controls">
                <button className='filter-button' style={{width: '120px', backgroundColor: 'var(--neutral-background-color)', border: '1px solid var(--field-border-color)', color: 'var(--tertiary-font-color)'}}
                    onClick = {  handleCreateNotesClick }>Cancel</button>
                <button className='primary-button' style={{width: '135px', gap: '0px'}}>Save Note</button>
                
            </div>
        </div>
    )
}

export default CreateNotes;