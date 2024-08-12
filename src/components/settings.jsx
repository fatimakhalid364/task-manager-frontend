window.global || window.globalThis
import MainDiv from "src/components/maindiv/maindiv";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Settings() {
    const change = () => {
        editorState= false;
    }

    return (
        <MainDiv>
        </MainDiv>
    )
}

export default Settings;