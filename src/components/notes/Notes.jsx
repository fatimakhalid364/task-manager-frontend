import MainDiv from "src/components/maindiv/maindiv";
import NoteCard from "./sub_components/NoteCard";
import PageHeader from 'src/components/PageHeader';
import 'src/components/notes/Notes.css';
import FilterButton from "src/components/Filter/FilterButton";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllNotesThunk } from 'src/store/thunks/notesThunk';
import BottomButtons from "src/components/BottomButtons";
import BottomBar from 'src/components/BottomBar/BottomBar';
import { useResponsive } from 'src/constants/media_queries';



const Notes = () => {
    

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        onWholeScreen,
        isBp6,
        isBp8,
    } = useResponsive();

    const [doubleArrowClicked, setDoubleArrowClicked] = useState(false);
    const handleDoubleArrowClicked = () => setDoubleArrowClicked(prevValue => !prevValue);

    const notesArray = [
        {
            title: "Web Design Project",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt, sapien eu vestibulum lacinia, elit lectus aliquam felis, a cursus lacus metus vel erat. Sed ac orci non arcu condimentum feugiat at id sapien.some more stuff",
            tag: 'Design',
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            id: 1
           
        },
        {
            title: "Object 2",
            desc: "Description for object 2",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design',
            id: 2
        },
        {
            title: "Object 3",
            desc: "Description for object 3",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design',
            id: 3    
        },
        {
            title: "Object 4",
            desc: "Description for object 4",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design', 
            id: 4    
        },
        {
            title: "Object 5",
            desc: "Description for object 5",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design',
            id: 5     
        },
        {
            title: "Object 6",
            desc: "Description for object 6",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design', 
            id: 6    
        },
        {
            title: "Object 7",
            desc: "Description for object 7",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design', 
            id: 7    
        },
        {
            title: "Object 8",
            desc: "Description for object 8",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            tag: 'Design', 
            id: 8   
        },
    ];

    

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
                       
                        {notesArray.map((note, index) => (
                            <NoteCard
                                key={index} // Use index for key as notes might not have unique IDs
                                title={note.title}
                                desc={note.desc}
                                links={note.links}
                                date={note.date}
                                pinned={note.pinned}
                                hide={note.hide}
                                id={note.id}
                                tag={note.tag}
                            />
                        ))}
                    </div >

                </div>
                <BottomButtons doubleArrowClicked={ doubleArrowClicked} />
                { !isAdaptableScreen && <BottomBar handleDoubleArrowClicked = { handleDoubleArrowClicked } doubleArrowClicked={ doubleArrowClicked } />}
            </MainDiv>
        </>
    );
};

export default Notes;
