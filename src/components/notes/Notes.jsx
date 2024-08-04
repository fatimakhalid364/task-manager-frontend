import MainDiv from "src/components/maindiv/maindiv";
import NoteCard from "./sub_components/NoteCard";


const Notes = () => {
    const notesArray = [
        {
            title: "Object 1",
            desc: "Description for object 1",
            links: ["link1", "link2"],
            date: new Date(),
            pinned: true,
            hide: false,
            _id: "objectId1"
        },
    ];



    return (
        <>
            <MainDiv>
                <div>Notes</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '90%' }}>
                    {/* Use map to iterate and return JSX elements */}
                    {notesArray.map((note, index) => (
                        <NoteCard
                            key={index} // Use index for key as notes might not have unique IDs
                            title={note.title}
                            desc={note.desc}
                            links={note.links}
                            date={note.date}
                            pinned={note.pinned}
                            hide={note.hide}
                            _id={note._id}
                        />
                    ))}
                </div >
            </MainDiv>
        </>
    );
};

export default Notes;
