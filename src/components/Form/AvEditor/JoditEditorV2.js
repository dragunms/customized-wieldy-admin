import React, {useRef} from 'react';
import {UPLOAD_IMAGE_ENDPOINT, VIEW_ASSET_ENDPOINT} from 'src/constants/apiEndpoints';
import JoditEditor from 'jodit-react';

const Editor = ({name, value, onChange}) => {
    const refEditor = useRef(null);

    function handleChange(e) {
        onChange(e);
    }

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
            defaultHandlerSuccess(res) {
                if (res.files && res.files.length) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.files.length; i++) {
                        const fullFilePath = res.baseurl + res.files[i];
                        this.selection.insertImage(fullFilePath, null, 250);
                    }
                }
            },
        },
    };

    /* eslint-enable */
    return (
        <div>
            <JoditEditor config={CONFIG} id={name} name={name} ref={refEditor} onChange={handleChange} value={value} />
        </div>
    );
};
export default Editor;
