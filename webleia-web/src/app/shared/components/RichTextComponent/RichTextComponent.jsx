import { convertToRaw, EditorState, ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { Box, Grid2, Typography } from "@mui/material";
import punycode from 'punycode';

const getDefaultState = (html) => {
    const contentBlock = htmlToDraft(html || '');
    if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        return editorState
    }
    return EditorState.createEmpty()
}

export default function RichTextComponent({ onChange, defaultValue = "" }) {
    const [editorState, setEditorState] = useState(getDefaultState(defaultValue));

    useEffect(() => {
        onEditorStateChange(editorState, true)
    }, [])

    const onEditorStateChange = function (editorState, firstCheck = false) {
        let newText = editorState.getCurrentContent().getPlainText("\u0001");
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        onChange?.({
            html,
            plainText: newText,
            counters: {
                words: getWordCount(editorState),
                chars: getCharCount(editorState)
            }
        }, firstCheck);
        setEditorState(editorState);
    };

    const getWordCount = (editorState) => {
        const plainText = editorState.getCurrentContent().getPlainText('');
        const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
        const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
        const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
        return wordArray ? wordArray.length : 0;
    };

    const getCharCount = (editorState) => {
        const decodeUnicode = (str) => punycode.ucs2.decode(str); // func to handle unicode characters
        const plainText = editorState.getCurrentContent().getPlainText('');
        const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
        const cleanString = plainText.replace(regex, '').trim(); // replace above characters w/ nothing
        return decodeUnicode(cleanString).length;
    };

    return (
        <Grid2>

            <Grid2 width='100%' borderRadius='4px' style={{ background: '#fff', border: "1px solid #F1F1F1", }}>
                <Editor
                    editorState={editorState}
                    spellCheck={true}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{
                        background: 'white',
                        padding: "10px"
                    }}
                    toolbar={{ options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'history'] }}
                />
            </Grid2>
            <Box display='flex' mt="5px" width='100%' flexDirection='row' justifyContent='space-between'>
                <Typography fontSize='14px'>{getWordCount(editorState)} Palavras</Typography>
                <Typography fontSize='14px'>{getCharCount(editorState)} Caracteres</Typography>
            </Box>
        </Grid2>
    );
}
