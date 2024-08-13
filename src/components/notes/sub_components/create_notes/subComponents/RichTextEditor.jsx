import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import React, { useState } from 'react';
import 'src/components/notes/sub_components/create_notes/subComponents/RichTextEditor.css';

function RichTextEditor() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const toolbarConfig = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'history'],
    inline: {
      inDropdown: false,
      options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
      inDropdown: true,
    },
    fontFamily: {
      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
      inDropdown: true,
    },
    list: {
      inDropdown: false,
      options: ['unordered', 'ordered'],
    },
    textAlign: {
      inDropdown: false,
      options: ['left', 'center', 'right', 'justify'],
    },
    colorPicker: {
      inDropdown: true,
    },
    emoji: {
      inDropdown: true,
    },
    history: {
      inDropdown: false,
      options: ['undo', 'redo'],
    },
  };

  return (
    <div className="editor" style={{marginTop: '15px', width: '100%', border: '1px solid var(--field-border-color)', borderRadius: '8px 8px 0 0', minHeight: '404px'}}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
        placeholder="The note goes here..."
        toolbar={toolbarConfig}
      />
    </div>
  );
}

export default RichTextEditor;