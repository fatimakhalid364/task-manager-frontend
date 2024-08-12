import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function RichTextEditor() {
const [editorState, setEditorState] = useState(
() => EditorState.createEmpty(),
);
return (
<div className="App">
<h1>Text Editor</h1>
<Editor
editorState={editorState}
onEditorStateChange={setEditorState}
placeholder="The message goes here..."
/>
</div>
)
}
export default RichTextEditor;