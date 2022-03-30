import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {message} from 'antd';

// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce';

import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/print';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/preview';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/dark/content.min.css';

import {UPLOAD_IMAGE_ENDPOINT} from 'src/constants/apiEndpoints';

const TinymceEditor = ({value, onChange}) => {
    function handleOnUploadSuccess(res) {
        console.log(res.data.url);
    }

    function handleOnUploadError(res) {
        console.error(res);
    }

    const uploadServer = {
        url: UPLOAD_IMAGE_ENDPOINT,
        field: 'image',
        success: handleOnUploadSuccess,
        error: handleOnUploadError,
    };

    function handleEditorChange(content) {
        if (onChange) {
            onChange(content);
        }
    }

    function handleImageUploader(blobInfo, success, failure) {
        const formData = new FormData();
        formData.append(uploadServer.field, blobInfo.blob(), blobInfo.filename());

        fetch(uploadServer.url, {
            // Your POST endpoint
            method: 'POST',
            headers: uploadServer.headers,
            credentials: 'include',
            timeout: 60,
            body: formData,
        })
            .then((response) => {
                if (!response.ok) throw message.error(`Hệ thống gặp sự cố.`);
                return response.json();
            })

            .then((res) => {
                success(res.data.url);
                uploadServer.success(res);
            })
            .catch((error) => {
                failure(error);
                uploadServer.error(error);
            })
            .finally(() => {});
    }
    return (
        <Editor
            initialValue={value}
            init={{
                height: 500,
                skin: false,
                content_css: false,
                branding: false,
                images_upload_url: UPLOAD_IMAGE_ENDPOINT,
                images_upload_credentials: true,
                images_upload_handler: handleImageUploader,
                plugins: [
                    'link image imagetools',
                    'table paste',
                    'code',
                    'lists advlist',
                    'quickbars',
                    'table',
                    'searchreplace',
                    'paste',
                    'hr',
                    'charmap',
                    'fullscreen',
                    'print',
                    'toc',
                    'preview',
                ],
                image_advtab: true,
                quickbars_selection_toolbar:
                    'bold italic | alignleft aligncenter alignright alignjustify | quicklink | forecolor backcolor ',
                quickbars_insert_toolbar: false,
                paste_enable_default_filters: false,
                toolbar_mode: 'wrap',
                fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
                toolbar:
                    // eslint-disable-next-line no-multi-str
                    'undo redo  | bold italic underline strikethrough | formatselect fontsizeselect fontselect | forecolor backcolor lineheight removeformat | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist | outdent indent | image link | table | hr charmap fullscreen preview print code help |',

                menubar: 'file edit insert view format table tools help',

                menu: {
                    file: {title: 'File', items: 'newdocument restoredraft | preview | print '},
                    edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace'},
                    view: {
                        title: 'View',
                        items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen',
                    },
                    insert: {
                        title: 'Insert',
                        items:
                            'image link media template codesample inserttable | charmap hr | pagebreak nonbreaking anchor toc | insertdatetime',
                    },
                    format: {
                        title: 'Format',
                        items:
                            'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat',
                    },
                    tools: {title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount'},
                    table: {title: 'Table', items: 'inserttable | cell row column | tableprops deletetable'},
                    help: {title: 'Help', items: 'help'},
                },
                content_style: 'img { max-width: 100%; }',
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TinymceEditor;
