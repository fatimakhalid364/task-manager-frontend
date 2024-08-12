import plus from 'src/assets/add-notes.svg';
import 'src/components/notes/sub_components/create_notes/CreateNotes.css'

const CreateNotes = () => {
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
            <div className="add-notes-input-fields">
                    <div className="add-notes-input-title">
                        <div>
                            Title
                        </div>
                        <input type="text" name="title" placeholder='Enter title here' value='title' />
                    </div>
                    <div className="add-notes-input-details">

                    </div>
            </div>
            <div className="add-notes-controls">

            </div>
        </div>
    )
}

export default CreateNotes;