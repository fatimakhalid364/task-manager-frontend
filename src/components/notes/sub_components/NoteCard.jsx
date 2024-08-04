
const NoteCard = ({ title, desc, links, date, pinned, hide, _id }) => {
    return (
        <div style={{ marginTop: '8px', padding: '4px', width: '33.33%' }}>
            <div style={{ backgroundColor: '#ff0000', padding: '4px' }}>
                <div>NoteCard {_id}</div>
                <div>{title}</div>
                <div>{desc}</div>
                {/* ... other props ... */}
            </div>

        </div>
    );
};

export default NoteCard;
