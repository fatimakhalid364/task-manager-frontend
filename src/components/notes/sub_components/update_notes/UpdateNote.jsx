import { useState } from "react";
import { useLocation } from "react-router-dom";
import MainDiv from "src/components/maindiv/maindiv";
import CreateNotes from "src/components/notes/sub_components/create_notes/CreateNotes";
const UpdateNote = () => {
    const location = useLocation();
    const { noteDetails } = location.state || {
        _id: "",
        pinned: false,
        date: new Date(),
        title: "",
        desc: "",
        links: [],
        tags: [],
    };
    console.log("description in the update", noteDetails?.desc);

    const [details, setDetails] = useState(noteDetails);

    return (
        <MainDiv>
            <CreateNotes
                noteDetails={details}
                setNoteDetails={setDetails}
                update={true}
            />
        </MainDiv>
    );
};

export default UpdateNote;
