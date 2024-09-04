import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Delete_Icon from "src/assets/Delete_Icon.svg";
import visibility from "src/assets/eye.svg";
import paperClip from "src/assets/paper-clip.svg";
import pin from "src/assets/pin.svg";
import trash from "src/assets/trash.svg";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import "src/components/notes/sub_components/NoteCard.css";
import {
    changePinnedStatus,
    deleteNoteThunk,
} from "src/store/thunks/notesThunk";
import NotificationModal from "../../notifications/NotificationModal";
import { errorToast, successToast } from "../../toasters/toast";
import PinIcon from "src/components/icons/PinIcon";
import { useSelector } from "react-redux";
import TrashIcon from 'src/components/icons/TrashIcon';
import EyeIcon from 'src/components/icons/EyeIcon';

const NoteCard = ({
    title,
    desc,
    links,
    date,
    hide,
    pinning,
    tags = [],
    _id,
    notesArray,
    setNotesArray,
}) => {
    const accentColor = useSelector((state) => state.appearance.color);
    
    const [pinHovered, setPinHovered] = useState(false);
    const [eyeHovered, setEyeHovered] = useState(false);
    const [trashHovered, setTrashHovered] = useState(false);

    const handleMouseEnter = (type) => () => {
        switch (type) {
            case 'pin':
                setPinHovered(true);
                break;
            case 'eye':
                setEyeHovered(true);
                break;
            case 'trash':
                setTrashHovered(true);
                break;
            default:
                break;
        }
    };

    const handleMouseLeave = (type) => () => {
        switch (type) {
            case 'pin':
                setPinHovered(false);
                break;
            case 'eye':
                setEyeHovered(false);
                break;
            case 'trash':
                setTrashHovered(false);
                break;
            default:
                break;
        }
    };

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pinned, setPinned] = useState(
        pinning === "PINNED" ? pinning : "NOT_PINNED"
    );
    const [showAllTags, setShowAllTags] = useState(false);
    const containerRef = useRef(null);
    const [visibleTags, setVisibleTags] = useState(tags);
    const [hiddenTagCount, setHiddenTagCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const noteDetails = { title, desc, links, tags, date, _id, pinning };

    const handleViewNoteClick = () => {
        navigate(`/notes/${_id}`, { state: { noteDetails } });
    };

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

    const handlePinnedClick = async () => {
        setSpinner(true);
      const newPinnedStatus = pinned === "PINNED" ? "NOT_PINNED" : "PINNED";
      setPinned(newPinnedStatus);
      try {
        const response = await dispatch(
            changePinnedStatus({ _id: _id, pinned: newPinnedStatus })
        ).unwrap();
        console.log("here is the ", response);
        if (response.status === 200) {
            successToast(response.message, "note-pinned");
        } else {
            errorToast("Note isn't pinned", "pinned-note-error");
        }
    } catch (error) {
        console.log(error);
        errorToast("Note isn't pinned", "pinned-note-error");
    } finally {
        setSpinner(false);
      }
  };

    const handleDeleteClick = () => {
        setNoteToDelete(_id);
        setModalOpen(true);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };
    const sanitizedDesc = DOMPurify.sanitize(desc);

    const handleOkay = async () => {
        setSpinner(true);
      console.log("Okay button clicked");
      try {
          const response = await dispatch(deleteNoteThunk(_id)).unwrap();
        console.log(response);
        if (response.status === 200) {
          const filteredNotes = notesArray.filter((note) => note._id !== _id);
          setNotesArray(filteredNotes);
          successToast(response.message, "note-deleted");
      } else {
            errorToast("Note deletion failed", "note-delete-error");
        }
    } catch (error) {
        console.error("erroe", error);
    } finally {
          setSpinner(false);
      }
      setModalOpen(false);
  };

    return (
        <>
            <SpinnerLoader showSpinner={spinner} />

          {modalOpen && (
              <NotificationModal
                  open={modalOpen}
                  onOkay={handleOkay}
                  onCancel={handleCancel}
                  title={"Are you sure you want to Delete"}
                  message={
                      "Once deleted, you will not be able to recover this task. Please confirm if you wish to proceed."
                  }
                  titleInfo={"Task ?"}
                  icon={Delete_Icon}
                  primaryButtonText={"Delete"}
                  primaryButtonColor='error'
                  secondaryButtonText={"Cancel"}
                  secondaryButtonColor='info'
                  notificationType={"DELETE"}
              />
          )}
          <div
              className='note-card-div'
              style={{
                borderBottom: pinned === "PINNED"
                  ? `4px solid ${
                      accentColor === 'pink'
                        ? 'var(--pink-accent-color)'
                        : accentColor === 'green'
                        ? 'var(--green-accent-color)'
                        : accentColor === 'orange'
                        ? 'var(--orange-accent-color)'
                        : 'var(--primary-background-color)'
                    }`
                  : undefined,
              }}
          >
              <div className='note-card'>
                  <div className='note-title'>{title}</div>
                  {/* <div className='note-description'>{desc}</div> */}
                  <div
                      className='note-description'
                      dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
                  ></div>
                  <div
                      className={`note-tag-container ${showAllTags ? "scrollable" : ""}`}
                      ref={containerRef}
                  >
                      {visibleTags.map((tag, index) => (
                <div key={index} className='note-tag'>
                    {tag}
                </div>
            ))}
                      {hiddenTagCount > 0 && !showAllTags && (
                          <div
                              className='show-more-button'
                              onClick={() => setShowAllTags(true)}
                          >
                              +{hiddenTagCount}
                          </div>
                      )}
                      {showAllTags &&
                          tags.slice(visibleTags.length).map((tag, index) => (
                              <div key={visibleTags.length + index} className='note-tag'>
                                  {tag}
                              </div>
                          ))}
                  </div>
                  <div className='reference-div'>
                      <div className='reference-div-header'>
                          <img src={paperClip} alt='paper-clip' />
                          <div>Reference Links:</div>
                      </div>
                      <div className='note-ref-links'>{links.join(" , ")}</div>
                  </div>
                  <div className='note-footer'>
                      <div className='note-date'>{date.toLocaleDateString()}</div>
                      <div className='note-icons-div'>
                          <div
                              className='note-icons'
                              onClick={handlePinnedClick}
                              onMouseEnter={handleMouseEnter('pin')}
                                onMouseLeave={handleMouseLeave('pin')}
                              style={{
                                  backgroundColor:
                                      (pinHovered || pinned === "PINNED")
                                          ? (accentColor === 'pink'
                                            ? 'var(--light-pink-color)'
                                            : accentColor === 'green'
                                            ? 'var(--light-green-color)'
                                            : accentColor === 'orange'
                                            ? 'var(--light-orange-color)'
                                            : 'var(--active-background-color)')
                                          : undefined,
                              }}
                          >
                             <PinIcon color={((pinHovered || pinned === 'PINNED') && accentColor === 'pink')
                                    ? 'var(--pink-accent-color)'
                                    : ((pinHovered || pinned === 'PINNED') && accentColor === 'green')
                                    ? 'var(--green-accent-color)'
                                    : ((pinHovered || pinned === 'PINNED') && accentColor === 'orange')
                                    ? 'var(--orange-accent-color)'
                                    : ((pinHovered || pinned === 'PINNED') && accentColor === 'blue') ? 'var(--primary-background-color)' : 'var(--quaternary-font-color)'}
                                    />
                          </div>
                          <div className='note-icons'  onClick={handleViewNoteClick}  onMouseEnter={handleMouseEnter('eye')}
                                onMouseLeave={handleMouseLeave('eye')}
                                style={{
                                    backgroundColor:
                                        (eyeHovered)
                                            ? (accentColor === 'pink'
                                              ? 'var(--light-pink-color)'
                                              : accentColor === 'green'
                                              ? 'var(--light-green-color)'
                                              : accentColor === 'orange'
                                              ? 'var(--light-orange-color)'
                                              : 'var(--active-background-color)')
                                            : undefined,
                                }}>
                            <EyeIcon color={(eyeHovered && accentColor === 'pink')
                                    ? 'var(--pink-accent-color)'
                                    : (eyeHovered && accentColor === 'green')
                                    ? 'var(--green-accent-color)'
                                    : (eyeHovered && accentColor === 'orange')
                                    ? 'var(--orange-accent-color)'
                                    : (eyeHovered && accentColor === 'blue') ? 'var(--primary-background-color)' : 'var(--quaternary-font-color)'}  />
                          </div>
                          <div className='note-icons' onClick={handleDeleteClick}
                          onMouseEnter={handleMouseEnter('trash')}
                          onMouseLeave={handleMouseLeave('trash')}
                          style={{
                            backgroundColor:
                                (trashHovered)
                                    ? (accentColor === 'pink'
                                      ? 'var(--light-pink-color)'
                                      : accentColor === 'green'
                                      ? 'var(--light-green-color)'
                                      : accentColor === 'orange'
                                      ? 'var(--light-orange-color)'
                                      : 'var(--active-background-color)')
                                    : undefined,
                        }}>
                            <TrashIcon color={(trashHovered && accentColor === 'pink')
                                    ? 'var(--pink-accent-color)'
                                    : (trashHovered && accentColor === 'green')
                                    ? 'var(--green-accent-color)'
                                    : (trashHovered && accentColor === 'orange')
                                    ? 'var(--orange-accent-color)'
                                    : (trashHovered && accentColor === 'blue') ? 'var(--primary-background-color)' : 'var(--quaternary-font-color)'}  />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};

export default NoteCard;
