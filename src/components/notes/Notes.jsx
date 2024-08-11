import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BottomBar from 'src/components/BottomBar/BottomBar';
import BottomButtons from "src/components/BottomButtons";
import FilterButton from "src/components/Filter/FilterButton";
import PageHeader from 'src/components/PageHeader';
import MainDiv from "src/components/maindiv/maindiv";
import 'src/components/notes/Notes.css';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getAllNotesThunk } from 'src/store/thunks/notesThunk';
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import NoteCard from "./sub_components/NoteCard";

const Notes = () => {

    const dispatch = useDispatch();
    const privateKey = localStorage.getItem("privateKey");

    const [pinned, setPinned] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const {
        isAdaptableScreen,
    } = useResponsive();
    const [metaData, setMetaData] = useState()
    const [doubleArrowClicked, setDoubleArrowClicked] = useState(false);
    const handleDoubleArrowClicked = () => setDoubleArrowClicked(prevValue => !prevValue);

    const [notesArray, setNotesArray] = useState([]);

    const getAllNotes = async (page = 0, limit = 5, pinned = '') => {
        try {
            const params = { page, limit, pinned }
            const response = await dispatch(getAllNotesThunk(params)).unwrap();
            const notes = response?.data || [];
            notes?.forEach(note => {
                console.log(note.title)

                note.title = decryptSingleValues(note.title, privateKey);
                note.desc = decryptSingleValues(note.desc, privateKey);
            });
            const formattedNotes = notes.map(note => ({
                ...note,
                date: new Date(note.createdAt)
            }));
            console.log(response?.data);
            setNotesArray(formattedNotes);
            setMetaData(response?.metaData);
            successToast(response.message, 'note-created');
        } catch (err) {
            errorToast('Something went wrong', 'getNotes-pages-error');
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
    const filterDiv = (
        <FilterButton />
    )

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
        debouncedGetAllNotes(page, limit, pinned)
    }, [page, limit, pinned, debouncedGetAllNotes])


    return (
        <>

            <MainDiv>
                <div className='notes-page'>
                    <PageHeader text='All Notes' total='20' object='Notes' filterDiv={ filterDiv } />
                    <div className='notes-collection-div'>
                        <div className='notes-collection'>
                            <div className='notes all-notes' onClick={handleAllNotesClick}
                                style={{ 
                                    backgroundColor: isAllNotesClicked && 'var(--active-background-color)',
                                    cursor: isAllNotesClicked && 'pointer',
                                    color: isAllNotesClicked && 'var(--primary-background-color)'
                                }}>
                                All Notes
                            </div>
                            <div className='notes pinned-notes' onClick={handlePinnedNotesClick}
                                style={{
                                    backgroundColor: isPinnedNotesClicked && 'var(--active-background-color)',
                                    cursor: isPinnedNotesClicked && 'pointer',
                                    color: isPinnedNotesClicked && 'var(--primary-background-color)'
                                }}>
                                Pinned Notes
                            </div>
                        </div>
                        
                    </div>
                    <div className='notes-display'>
                       
                        {notesArray?.map((note, index) => (
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
                        ))}
                    </div >

                </div>
                <BottomButtons  />
                { !isAdaptableScreen && <BottomBar  />}
            </MainDiv>
        </>
    );
};

export default Notes;
