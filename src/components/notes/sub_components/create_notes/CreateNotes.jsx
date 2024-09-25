import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import plus from "src/assets/add-notes.svg";
import AttachFileIcon from "src/components/icons/AttachFileIcon";
import TagIcon from "src/components/icons/TagIcon";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import "src/components/notes/sub_components/create_notes/CreateNotes.css";
import RichTextEditor from "src/components/notes/sub_components/create_notes/subComponents/RichTextEditor";
import TagsInput from "src/components/notes/sub_components/create_notes/subComponents/TagsInput";
import { errorToast, successToast } from "src/components/toasters/toast.js";
import { useResponsive } from 'src/constants/media_queries';
import { addNotes, setNotes } from 'src/store/slices/notesSlice';
import { createNoteThunk, updateNoteThunk } from "src/store/thunks/notesThunk";
import { encryptArrayValues, encryptObjectValues } from "src/utils/encryptionUtil";
import { setNotesFilterValue } from "../../../../store/slices/filterByStatusSlice";


const CreateNotes = ({
    setCreateNotesClicked,
    // setNotesArray,
    noteDetails,
    setNoteDetails,
    update = false,
}) => {
    const {
        isAdaptableScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notes = useSelector((state) => state.notes);
    const [spinner, setSpinner] = useState(false);
    const [attachLinkClicked, setAttachLinkClicked] = useState(false);
    const [showLinkPopup, setShowLinkPopup] = useState(false);
    const handleShowLinkPopup = () => setShowLinkPopup(true);
    const accentColor = useSelector((state) => state.appearance.color);
    const notesFilterValue = useSelector((state) => state.filterByStatus.notesFilterValue);

    const [addLinkHovered, setAddLinkHovered] = useState(false);
    const [addTagHovered, setAddTagHovered] = useState(false);

    const handleMouseEnter = (type) => () => {
        switch (type) {
            case 'link':
                setAddLinkHovered(true);
                break;
            case 'tag':
                setAddTagHovered(true);
                break;
          
        }
    };

    const handleMouseLeave = (type) => () => {
        switch (type) {
            case 'link':
                setAddLinkHovered(false);
                break;
            case 'tag':
                setAddTagHovered(false);
                break;
           
        }
    };

    const handleAttachLinkClick = () => {
      setAttachLinkClicked((prevValue) => !prevValue);
      if (!attachLinkClicked) {
          handleShowLinkPopup();
      }
  };

    const handleCloseLinkPopup = () => {
        setShowLinkPopup(false);
        handleAttachLinkClick();
    };

    const [addTagClicked, setAddTagClicked] = useState(update ? true : false);

    const handleAddTagClick = () => {
      setAddTagClicked((prevValue) => !prevValue);
  };

    const handleNoteInputChange = (event) => {
        const { value, name } = event.target;

      if (name === "links") {
          setNoteDetails((prev) => ({ ...prev, links: [...prev.links, value] }));
      } else {
          setNoteDetails((prev) => ({ ...prev, [name]: value }));
      }
  };

    const handleTitleChange = (event) => {
        const { value } = event.target;
      setNoteDetails((prev) => ({ ...prev, title: value }));
  };

    const extractHrefFromAnchors = (htmlString) => {
        const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const anchorTags = doc.querySelectorAll("a");
      return Array.from(anchorTags).map((anchor) => anchor.href);
  };

    const removeDuplicateLinks = (linksArray) => {
        return [...new Set(linksArray)];
    };
    const handleCreateClick = async () => {
        setSpinner(true);
        try {
        const linksInDesc = extractHrefFromAnchors(noteDetails.desc);
        let uniqueLinks = removeDuplicateLinks(linksInDesc);
            const splitDesc = noteDetails.desc.match(/.{1,32}/g);
            const encryptedDesc = encryptArrayValues(splitDesc);
        setNoteDetails((prev) => ({
            ...prev,
          links: uniqueLinks,
        }));
        const forEncryption = {
            title: noteDetails.title,
        };
        const encryptedNoteDetails = encryptObjectValues(forEncryption);
        console.log("encrypted ones", encryptedNoteDetails);
        const updatedTaskDetails = {
            ...noteDetails,
          title: encryptedNoteDetails?.title,
            desc: encryptedDesc,
          links: uniqueLinks,
        };

        const thunkToDispatch = update
            ? updateNoteThunk(updatedTaskDetails)
            : createNoteThunk(updatedTaskDetails);
            const response = await dispatch(thunkToDispatch).unwrap();
            noteDetails._id = response?.data?._id;
            if (response.status === 201 || response.status == 200) {
                let filteredNotes;
                if (update) {
                    filteredNotes = notes.notes.filter((note) => note._id !== response?.data?._id);
                    const updatedArray = [noteDetails, ...filteredNotes];
                    dispatch(setNotes(updatedArray));
                } else if (!update) {
                    const obj = { ...noteDetails, links: uniqueLinks };
                    {
                        !update && dispatch(addNotes(obj));
                    }
                }

          successToast(response.message, "task-created");
          {
              update ? navigate(-1) : setCreateNotesClicked(false);
          }
      } else {
            errorToast("Something went wrong", "authentication-pages-error");
            {
                update ? "" : setCreateNotesClicked(false);
            }
        }
        setSpinner(false);
        {
            update ? "" : setCreateNotesClicked(false);
        }
    } catch (error) {
        setSpinner(false);

          console.error("Error occurred while dispatching thunk:", error);
          errorToast(error.message, "authentication-pages-error");
          {
              update ? "" : setCreateNotesClicked(false);
          }
      }
  };

  useEffect(() => {
    console.log('value of addLinkHovered' , addLinkHovered);
  }, [addLinkHovered]);

    return (
      <div className='add-notes-page' style={{marginBottom: isMicroScreen && '40px'}}>
          <SpinnerLoader showSpinner={spinner} />
          <div className='add-notes-header-div'>
              <div className='add-notes-header' style={{marginLeft: isMicroScreen && '11px'}}>
                  {!update && (
                      <div>
                          <img src={plus} alt='plus-sign' />
                      </div>
                  )}
                  <div style={{fontSize: isMicroScreen && '21px', marginTop: isMicroScreen && '2px'}}>{update ? "View or Update" : "Add Note"}</div>
              </div>
          </div>
          <form className='add-notes-input-fields' style={{marginLeft: isMicroScreen ? '12px' : '38px'}}>
              <div className='add-notes-input-title'>
                  <div
                      style={{
                          fontSize: "16px",
                          fontFamily: "var(--secondary-font-family)",
                          color: "var(--secondary-font-color)",
                          fontWeight: "500",
                      }}
                  >
                      Title
                  </div>
                  <input
                      type='text'
                      name='title'
                      placeholder='Enter title here'
                      className='create-notes-input'
                      onChange={handleTitleChange}
                      value={noteDetails.title}
                  />
              </div>
              <div className='add-notes-input-details'>
                  <RichTextEditor
                      showLinkPopup={showLinkPopup}
                      handleShowLinkPopup={handleShowLinkPopup}
                      handleCloseLinkPopup={handleCloseLinkPopup}
                      handleAttachLinkClick={handleAttachLinkClick}
                      handleNoteInputChange={handleNoteInputChange}
                      value={noteDetails.desc}
                  />
                  <div className='note-attachments-div'>
                      <div
                        
                          className='note-attachments note-attachments-a'
                          onClick={handleAttachLinkClick}
                          style={{
                              color: attachLinkClicked && 'var(--primary-background-color)'
                              ,
                              backgroundColor:
                              attachLinkClicked && 'var(--active-background-color)',
                            width: isMicroScreen ? '40px' : '138px'
                          }}
                      >
                          <AttachFileIcon
                              color={
                                  attachLinkClicked ? 'var(--primary-background-color)'
                                   : "var(--tertiary-font-color)"
                              }
                          />
                          { !isMicroScreen && (<div>Attach Link</div>)}
                      </div>
                      <div
                             
                          className='note-attachments note-attachments-b'
                          onClick={handleAddTagClick}
                          style={{
                            color: addTagClicked  &&   'var(--primary-background-color)'
                            ,
                            backgroundColor:
                            addTagClicked   && 'var(--active-background-color)',
                            width: isMicroScreen ? '40px' : '138px',
                        }}
                      >
                          <TagIcon
                              color={
                                  addTagClicked ? 'var(--primary-background-color)'
                                      
                                      : "var(--tertiary-font-color)"
                              }
                          />
                          { !isMicroScreen && (<div>Add Tag</div>)}
                      </div>
                      {addTagClicked && (
                          <TagsInput
                              handleNoteInputChange={handleNoteInputChange}
                              value={noteDetails.tags}
                          />
                      )}
                  </div>
              </div>
          </form>
          <div className='add-notes-controls'  style={{marginLeft: isMicroScreen ? '12px' : '38px', justifyContent: isMicroScreen ? 'space-between' : 'flex-end'}}>
              <button
                  className='filter-button'
                  style={{
              width: "120px",
              backgroundColor: "var(--neutral-background-color)",
              border: "1px solid var(--field-border-color)",
              color: "var(--tertiary-font-color)",
          }}
                  onClick={() => {
                      if (update) {
                          navigate(-1);
                      } else {
                          setCreateNotesClicked(false);
                      }
                  }}
              >
                  {update ? "Close" : "Cancel"}
              </button>
              <button
                  className='primary-button'
                  onClick={handleCreateClick}
                  style={{ width: "135px", gap: "0px", backgroundColor: 'var(--primary-background-color)', }}
              >
                  {update ? "Update Note" : "Save Note"}
              </button>
          </div>
      </div>
  );
};

export default CreateNotes;
