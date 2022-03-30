import React, {useEffect, useRef, useState} from 'react';
import {UPLOAD_IMAGE_ENDPOINT, VIEW_ASSET_ENDPOINT} from 'src/constants/apiEndpoints';

const CONFIG = {
    height: 500,
    placeholder: '...',
    enableDragAndDropFileToEditor: true,
    toolbarSticky: false,
    uploader: {
        withCredentials: true,
        url: UPLOAD_IMAGE_ENDPOINT,
        imagesExtensions: ['jpg', 'png', 'jpeg'],
        filesVariableName: (e) => {
            return 'image';
        },

        isSuccess(res) {
            return res.success;
        },

        process(res) {
            return {
                files: [`${res.data.name}`],
                path: `${res.data.name}`,
                baseurl: `${VIEW_ASSET_ENDPOINT}/`,
                error: res.error,
                msg: res.msg,
            };
        },
    },
};

const JoditEditor = ({value, onChange}) => {
    const refEditor = useRef(null);

    const [editor, setEditor] = useState(null);

    /* eslint-disable */
    useEffect(() => {
        function handleChange(value) {
            onChange(value);
        }

        const jodit = new window.Jodit(refEditor.current, CONFIG);
        jodit.events.on('change', handleChange);

        setEditor(jodit);
    }, []);

    useEffect(() => {
        if (editor) {
            editor.value = value;
        }
    }, [editor, value]);
    /* eslint-enable */
    return <textarea name='editor' ref={refEditor} onChange={onChange} />;
};
export default JoditEditor;
