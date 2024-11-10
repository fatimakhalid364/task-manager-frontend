import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterDialog from 'src/components//Filter/FilterDialog';
import BottomBar from "src/components/BottomBar/BottomBar";
import BottomButtons from "src/components/BottomButtons";
import FilterButton from "src/components/Filter/FilterButton";
import PageHeader from "src/components/PageHeader";
import PlusIcon from 'src/components/icons/PlusIcon';
import MainDiv from "src/components/maindiv/maindiv";
import "src/components/notes/Notes.css";
import CreateNotes from "src/components/notes/sub_components/create_notes/CreateNotes";
import { errorToast } from "src/components/toasters/toast.js";
import { useResponsive } from "src/constants/media_queries";
import { add_t_obj, allNotes_t_obj, filteredNotes_t_obj, notes_t_obj } from "src/constants/translationObj";
import { getAllNotesThunk } from "src/store/thunks/notesThunk";
import NoteCard from "./sub_components/NoteCard";
import emptyBlue from "src/assets/Empty-blue.svg";
import emptyPink from "src/assets/Empty-pink.svg";
import emptyGreen from "src/assets/Empty-green.svg";
import emptyOrange from "src/assets/Empty-orange.svg"

const Notes = () => {
    const lang = useSelector((state) => state.format.language);
    const dispatch = useDispatch();
    const privateKey = localStorage.getItem("privateKey");
    const notes = useSelector((state) => state.notes);
    useEffect(() => {
        console.log('notes picked up using useSelector are ', notes)
    }, []);

    const entireSlice = useSelector((state) => state.filterByStatus.dueDateValueForTasks.parse);

    useEffect(() => {
        console.log('here is the entire slice }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}', entireSlice)
    }, [])
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [pinned, setPinned] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const [loading, setLoading] = useState(false);
    const accentColor = useSelector((state) => state.appearance.color);
    const [allNotesHovered, setAllNotesHovered] = useState(false);
    const [pinnedNotesHovered, setPinnedNotesHovered] = useState(false);
    const [notesFilterOpen, setNotesFilterOpen] = useState(false);
    const handleNotesFilterOpen = () => setNotesFilterOpen(true);
    const handleNotesFilterClose = () => setNotesFilterOpen(false);

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

    // const [notesArray, setNotesArray] = useState([]);
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

    const getAllNotes = async (page = 0, limit = 5, pinned = "", loading = true) => {
        try {
            setSkeletonLoader(loading);
            setLoading(true);
        const params = { page, limit, pinned };
        const response = await dispatch(getAllNotesThunk(params)).unwrap();
        const notes = response?.data || [];
            console.log('the response named notes in the getAllNotes function is', notes);
            console.log('notes in the component', response);
            setSkeletonLoader(false);
            setLoading(false);

    } catch (err) {
            errorToast("Something went wrong here", "getNotes-pages-error",);
            console.log('err', err)
            setSkeletonLoader(false);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const debouncedGetAllNotes = useCallback(
        debounce((page, limit, pinned) => {
            getAllNotes(page, limit, pinned, false);
        }, 300),
        [page, limit, pinned]
    );
    const filterDiv = <FilterButton   handleFilterOpen={handleNotesFilterOpen} />;

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
    const handleScroll = useCallback(() => {
        const scrollableHeight = document.documentElement.scrollHeight;
        const scrolledHeight = window.innerHeight + window.scrollY;
        if (scrolledHeight + 200 >= scrollableHeight && !loading && notes.metaData?.hasNextPage) {
            const newPage = page + 1
            debouncedGetAllNotes(newPage, limit, pinned);
            setPage(page + 1);
        }
    }, [loading, notes.metaData, pinned, limit, debouncedGetAllNotes]);

    useEffect(() => {
        if (!notes.notesLoaded) {
            getAllNotes(page, limit, pinned);
        }
    }, [notes.notesLoaded, page, limit, pinned]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    return (
        <>
          <MainDiv>
          {notesFilterOpen && (<FilterDialog filterOpen={notesFilterOpen} handleFilterClose={handleNotesFilterClose} notesArray={notes.notes}/>)}
              <div className='notes-page' >
                  {createNotesClicked ? (
                      <CreateNotes
                          noteDetails={noteDetails}
                          setNoteDetails={setNoteDetails}
                          setCreateNotesClicked={setCreateNotesClicked}
                          notesArray={notes.notes}
                        //   setNotesArray={setNotesArray}
                          handleCreateNotesClick={handleCreateNotesClick}
                      />
                  ) : (
                      <div>
                              <PageHeader
                                    text={allNotes_t_obj[lang]}
                                  total='20'
                                    object={`${add_t_obj[lang]} ${notes_t_obj[lang]}`}
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
                                            {allNotes_t_obj[lang]}
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
                                            {filteredNotes_t_obj[lang]}
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

                                ) : notes.notes.length > 0 ? (
                                    notes.notes?.map((note, index) => (
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
                                            notesArray={notes.notes}
                                            // setNotesArray={setNotesArray}
                                            metaData={notes.metaData}
                                         
                                        />
                                    ))
                                ) : ( <div
                                    style={{
                                      width: '100%',
                                      position: 'absolute',
                                      top: '200px',
                                      left: '5%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <img
                                      style={{ width: '350px', height: '300px', marginLeft: '36px' }}
                                      src={
                                        accentColor === 'pink'
                                          ? emptyPink
                                          : accentColor === 'blue'
                                          ? emptyBlue
                                          : accentColor === 'green'
                                          ? emptyGreen
                                          : accentColor === 'orange'
                                          ? emptyOrange
                                          : emptyBlue
                                      }
                                      alt='empty'
                                    />
                                    <div
                                      style={{ marginLeft: '40px', fontFamily: 'var(--secondary-font-family)' }}
                                    >
                                        No Notes Available
                                    </div>
                                  </div>)}
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
