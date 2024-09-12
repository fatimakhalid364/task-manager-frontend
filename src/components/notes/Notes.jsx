import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BottomBar from "src/components/BottomBar/BottomBar";
import BottomButtons from "src/components/BottomButtons";
import FilterButton from "src/components/Filter/FilterButton";
import PageHeader from "src/components/PageHeader";
import MainDiv from "src/components/maindiv/maindiv";
import "src/components/notes/Notes.css";
import CreateNotes from "src/components/notes/sub_components/create_notes/CreateNotes";
import { errorToast } from "src/components/toasters/toast.js";
import { useResponsive } from "src/constants/media_queries";
import { getAllNotesThunk } from "src/store/thunks/notesThunk";
import { decryptSingleValues } from "src/utils/encryptionUtil";
import NoteCard from "./sub_components/NoteCard";
import { useSelector } from "react-redux";
import { MobileBottomBar } from 'src/components/MobileBottomBar/MobileBottomBar';
import PlusIcon from 'src/components/icons/PlusIcon';

const Notes = () => {
    const dispatch = useDispatch();
    const privateKey = localStorage.getItem("privateKey");
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [pinned, setPinned] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const [metaData, setMetaData] = useState();
    const [doubleArrowClicked, setDoubleArrowClicked] = useState(false);
    const handleDoubleArrowClicked = () =>
        setDoubleArrowClicked((prevValue) => !prevValue);
    const accentColor = useSelector((state) => state.appearance.color);
    const [allNotesHovered, setAllNotesHovered] = useState(false);
    const [pinnedNotesHovered, setPinnedNotesHovered] = useState(false);

    const handleMouseEnter = (type) => () => {
        switch (type) {
            case 'all-notes':
                setAllNotesHovered(true);
                break;
            case 'pinned-notes':
                setPinnedNotesHovered(true);
                break;
          
        }
    };

    const handleMouseLeave = (type) => () => {
        switch (type) {
            case 'all-notes':
                setAllNotesHovered(false);
                break;
            case 'pinned-notes':
                setPinnedNotesHovered(false);
                break;
           
        }
    };

    const [notesArray, setNotesArray] = useState([]);
    const [createNotesClicked, setCreateNotesClicked] = useState(false);

    const handleCreateNotesClick = () =>
        setCreateNotesClicked((prevValue) => !prevValue);
    const [noteDetails, setNoteDetails] = useState({
        _id: "",
        pinned: false,
        date: new Date(),
        title: "",
        desc: "",
        links: [],
        tags: [],
    });
    useEffect(() => {
      console.log("create notes popup", createNotesClicked);
  }, []);


  const noteLoader = <div className='note-card-div'>
  <div className="note-card">
      <div className="note-title skeleton-for-notes" style={{height: '15px', width: '70%'}}></div>
      <div className="note-description skeleton-for-notes" style={{minHeight: '15px', marginBottom: '5px', marginTop: '20px'}}></div>
      <div className="note-description skeleton-for-notes" style={{minHeight: '15px', marginBottom: '5px'}}></div>
      <div className="note-description skeleton-for-notes" style={{minHeight: '15px', marginBottom: '5px'}}></div>
      <div className="note-description skeleton-for-notes" style={{minHeight: '15px', marginBottom: '5px', width: '80%'}}></div>
      <div style={{display: 'flex', gap:'15px'}}>
          <div className="note-tag skeleton-for-notes" style={{width: '80px', marginTop: '20px'}}></div>
          <div className="note-tag skeleton-for-notes" style={{width: '80px', marginTop: '20px' }}></div>
      </div>
      <div style={{display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', marginTop: '20px'}}>
          <div className="skeleton-for-notes" style={{width: '30px', marginBottom: '10px', height: '30px', borderRadius: '50px'}}></div>
          <div className="skeleton-for-notes" style={{width: '100px', height: '20px'}}></div>
      </div>
      <div className="note-footer" style={{marginTop: '10px'}}>
          <div className='skeleton-for-notes' style={{width: '100px', height: '15px'}}></div>
          <div style={{display: 'flex', gap: '15px'}}>
              <div className='skeleton-for-notes' style={{width: '35px', height: '35px', borderRadius: '50px'}}></div>
              <div className='skeleton-for-notes' style={{width: '35px', height: '35px', borderRadius: '50px'}}></div>
              <div className='skeleton-for-notes' style={{width: '35px', height: '35px', borderRadius: '50px'}}></div>
          </div>
      </div>
  </div>
 </div>

    const getAllNotes = async (page = 0, limit = 5, pinned = "") => {
        try {
        setSkeletonLoader(true);
        const params = { page, limit, pinned };
        const response = await dispatch(getAllNotesThunk(params)).unwrap();
        const notes = response?.data || [];
        notes?.forEach((note) => {
            console.log(note.title);

          note.title = decryptSingleValues(note.title, privateKey);
          note.desc = decryptSingleValues(note.desc, privateKey);
            if (Array.isArray(note.desc)) {
                note.desc = note.desc.join('');
            }
      });
        const formattedNotes = notes.map((note) => ({
            ...note,
          date: new Date(note.createdAt),
        }));
            setNotesArray((prevNotes) => [...prevNotes, ...formattedNotes]);
            setMetaData(response?.metaData);
            setSkeletonLoader(false);
    } catch (err) {
            errorToast("Something went wrong", "getNotes-pages-error");
            setSkeletonLoader(false);
        } finally {
            // setSkeletonLoader(false);
        }
    };
    const debouncedGetAllNotes = useCallback(
        debounce((page, limit, pinned) => {
            getAllNotes(page, limit, pinned);
        }, 300),
        [page, limit, pinned]
    );
    const filterDiv = <FilterButton />;

    const [isAllNotesClicked, setIsAllNotesClicked] = useState(false);
    const [isPinnedNotesClicked, setIsPinnedNotesClicked] = useState(false);

    const handleAllNotesClick = () => {
        setIsAllNotesClicked(true);
        setIsPinnedNotesClicked(false);
    };

    const handlePinnedNotesClick = () => {
        setIsPinnedNotesClicked(true);
        setIsAllNotesClicked(false);
    };

    useEffect(() => {
      debouncedGetAllNotes(page, limit, pinned);
  }, [page, limit, pinned, debouncedGetAllNotes]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight = document.documentElement.scrollHeight;
            const scrolledHeight = window.innerHeight + window.scrollY;
            if (scrolledHeight + 200 >= scrollableHeight) {
                if (metaData?.hasNextPage) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [metaData]);
    return (
        <>
          <MainDiv>
              <div className='notes-page' >
                  {createNotesClicked ? (
                      <CreateNotes
                          noteDetails={noteDetails}
                          setNoteDetails={setNoteDetails}
                          setCreateNotesClicked={setCreateNotesClicked}
                          notesArray={notesArray}
                          setNotesArray={setNotesArray}
                          handleCreateNotesClick={handleCreateNotesClick}
                      />
                  ) : (
                      <div>
                              <PageHeader
                                  text='All Notes'
                                  total='20'
                                  object='Notes'
                                  filterDiv={filterDiv}
                                  handleOpen={handleCreateNotesClick}
                              />
                              <div className='notes-collection-div'>
                                  <div className='notes-collection'>
                                      <div
                                          className='notes all-notes'
                                          onClick={handleAllNotesClick}
                                          style={{
                                              backgroundColor:
                                                  (isAllNotesClicked || allNotesHovered) && (accentColor === 'pink'
                                                  ? 'var(--light-pink-color)'
                                                  : accentColor === 'green'
                                                  ? 'var(--light-green-color)'
                                                  : accentColor === 'orange'
                                                  ? 'var(--light-orange-color)'
                                                  : 'var(--active-background-color)'),
                                              cursor: isAllNotesClicked && "pointer",
                                              color:
                                                  (isAllNotesClicked || allNotesHovered) && (accentColor === 'pink'
                                                    ? 'var(--pink-accent-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--green-accent-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--orange-accent-color)'
                                                    : 'var(--primary-background-color)'),
                                            
                                          }}
                                          onMouseEnter={handleMouseEnter('all-notes')}
                                          onMouseLeave={handleMouseLeave('all-notes')}

                                      >
                                          All Notes
                                      </div>
                                      <div
                                          className='notes pinned-notes'
                                          onClick={handlePinnedNotesClick}
                                         
                                            style={{
                                                backgroundColor:
                                                    (isPinnedNotesClicked || pinnedNotesHovered) && (accentColor === 'pink'
                                                    ? 'var(--light-pink-color)'
                                                    : accentColor === 'green'
                                                    ? 'var(--light-green-color)'
                                                    : accentColor === 'orange'
                                                    ? 'var(--light-orange-color)'
                                                    : 'var(--active-background-color)'),
                                                cursor: isPinnedNotesClicked && "pointer",
                                                color:
                                                (isPinnedNotesClicked || pinnedNotesHovered) && (accentColor === 'pink'
                                                      ? 'var(--pink-accent-color)'
                                                      : accentColor === 'green'
                                                      ? 'var(--green-accent-color)'
                                                      : accentColor === 'orange'
                                                      ? 'var(--orange-accent-color)'
                                                      : 'var(--primary-background-color)'),
                                            }}
                                            onMouseEnter={handleMouseEnter('pinned-notes')}
                                            onMouseLeave={handleMouseLeave('pinned-notes')}
                                        
                                      >
                                          Pinned Notes
                                      </div>
                                  </div>
                              </div>
                              <div className='notes-display' style={{marginLeft: isMicroScreen && '8px'}}>
                                {skeletonLoader ? (
                                   <div style={{display: 'flex', gap: '30px'}}>
                                    {noteLoader}
                                    {noteLoader}
                                    {noteLoader}
                                   </div>

                                ) : (
                                    notesArray?.map((note, index) => (
                                        <NoteCard
                                            key={note._id}
                                            title={note.title}
                                            desc={note.desc}
                                            links={note.links}
                                            date={note.date}
                                            pinning={note.pinned}
                                            hide={note.hide}
                                            _id={note._id}
                                            tags={note.tags}
                                            notesArray={notesArray}
                                            setNotesArray={setNotesArray}
                                         
                                        />
                                    ))
                                )}
                          </div>
                      </div>
                  )}
              </div>
              <BottomButtons />
              {(!isAdaptableScreen && !isMicroScreen) && <BottomBar handleOpen={ handleCreateNotesClick } />}
            { (isMicroScreen && !isAdaptableScreen) && (<div className="circle-2">
                <div style={{width: '100%', borderRadius: '50px', display: 'flex', marginTop: '24px', justifyContent: 'center'}}
                onClick={handleCreateNotesClick}>
                <PlusIcon color='white' width='17' height='17' />
                </div>
            </div>)}
             
          </MainDiv>
      </>
  );
};

export default Notes;
