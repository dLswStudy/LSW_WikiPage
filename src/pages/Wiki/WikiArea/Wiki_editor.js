import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from "styled-components";

const MyBlock = styled.div`
  .editor {
    min-height: 300px;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;
function Wiki_editor(props) {
    const setEditorReference = (ref) => {
        props.editorRef.current = ref
    }

    return <MyBlock>
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="editor"
            initialContentState={props.contentState}
            onContentStateChange={props.onChange}
            editorRef={setEditorReference}
        />
    </MyBlock>
}


export default Wiki_editor;
