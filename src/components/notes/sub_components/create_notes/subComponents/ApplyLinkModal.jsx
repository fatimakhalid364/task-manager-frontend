import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { EditorState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';
import { useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/ApplyLinkModal.css';

const ApplyLinkModal = ({ editorState, setEditorState, showLinkPopup, handleShowLinkPopup, handleNoteInputChange, handleCloseLinkPopup, handleAttachLinkClick }) => {
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleLinkTextChange = (e) => setLinkText(e.target.value);
  // const handleLinkUrlChange = (e) => {
  //   setLinkUrl(e.target.value);
  //   handleNoteInputChange();
  // };

  const handleLinkUrlChange = (e) => {
    const url = e.target.value;
    // Check if URL already includes protocol (http or https)
    const hasProtocol = url.startsWith('http://') || url.startsWith('https://');
    setLinkUrl(hasProtocol ? url : `https://${url}`); // Add https:// if missing
    // Call handleNoteInputChange only when the URL is updated (optional)
    // if (hasProtocol !== url.startsWith('https://')) {
    //   handleNoteInputChange();
    // }
  };

  const applyLink = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    if (linkText && linkUrl) {
      // Create a new entity for the link
      const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: linkUrl });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      // Replace the current selection with the link text
      const newContentState = Modifier.replaceText(
        contentStateWithEntity,
        selectionState,
        linkText,
        null,
        entityKey
      );

      // Push the new content state to the editor state
      const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
      // handleNoteInputChange({ target: { name: 'links', value: linkUrl } });

      setEditorState(newEditorState);
      handleCloseLinkPopup();
      handleAttachLinkClick;
    } else {
      // Handle case where linkText or linkUrl is missing
      alert('Please enter both link text and URL.');
    }
  };

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

  return (
    <>
      {/* <button type="button" onClick={handleShow} style={{ position: 'absolute', top: '0' }}>Show</button> */}
      <Modal
        open={showLinkPopup}
        onClose={handleCloseLinkPopup}
        aria-labelledby="apply-link-modal"
        aria-describedby="modal-for-applying-links"
      >
        <div className='apply-link-div'>
        <div style={{ borderBottom: '1px solid var(--field-border-color)', height: '72%'}}>
            <div style={{ width: '100%', padding: '20px'}}>
              <label htmlFor='name-for-link' className='link-popup-inputs'>Name</label>
                <input
                    type="text"
                    placeholder="Enter link text"
                    value={linkText}
                    onChange={handleLinkTextChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '8px' }}
                    id='name-for-link'
                    
                />
              <label htmlFor='link-for-link' className='link-popup-inputs' >Link</label>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={linkUrl}
                    onChange={handleLinkUrlChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '20px', borderRadius: '8px' }}
                    id='link-for-link'
                    name='links'
                />
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginRight: '20px'}}>
            <Button onClick={handleCloseLinkPopup} variant="outlined"  style={{borderRadius: '28px'}}>
              Cancel
            </Button>
            <Button onClick={applyLink} variant="contained"  style={{borderRadius: '28px', backgroundColor: 'var(--primary-background-color)'}}>
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

ApplyLinkModal.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
};

export default ApplyLinkModal;