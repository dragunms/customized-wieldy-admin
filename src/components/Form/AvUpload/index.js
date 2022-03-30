import './styles.less';

import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal, Upload} from 'antd';
import {DeleteOutlined, InboxOutlined, PlayCircleOutlined, PushpinOutlined} from '@ant-design/icons';

import TranslationText from 'src/components/TranslationText';
import LazyImage from 'src/components/LazyImage';
import VideoPlayer from 'src/components/VideoPlayer';

import {UPLOAD_IMAGE_ENDPOINT, UPLOAD_VIDEO_ENDPOINT} from 'src/constants/apiEndpoints';

import {formatUrlAsset, formatUrlImage} from 'src/utilities/util';

const AvUpload = ({
    name,
    label = '',
    defaultValue,
    multiple = true,
    type = 'image',
    listType = 'picture-card',
    rules,
    accept = 'image/*',
    onChange,
    maxFiles = 1,
    maxFileSizes = null,
    control,
    disabled = false,
    hidden = true,
    className = '',
    imageWidth = null,
    imageHeight = null,
    imageType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
}) => {
    const [valueInput, setValueInput] = useState([]);
    const [previewImage, setPreviewImage] = useState('default.jpg');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [fileList, setFileList] = useState([]);

    const listStyle = maxFiles > 1 ? 'ant-upload-multiple' : 'ant-upload-single';

    const action = {
        image: {
            url: UPLOAD_IMAGE_ENDPOINT,
            field: 'image',
        },
        video: {
            url: UPLOAD_VIDEO_ENDPOINT,
            field: 'video',
        },
    };

    const TYPE_FILE = 'TYPE_FILE';
    const TYPE_IMAGE = 'TYPE_IMAGE';
    const TYPE_VIDEO = 'TYPE_VIDEO';

    function handleOnPreview(file) {
        let fileType = TYPE_FILE;
        let link;
        if (file.response) {
            link = file.response.data.url;
        } else {
            link = file.url;
        }
        if (link.match(/\.(jpg|jpeg|png|gif)/i)) {
            fileType = TYPE_IMAGE;
        }
        if (link.match(/\.(mp4|mov)/i)) {
            fileType = TYPE_VIDEO;
        }
        setPreviewImage(link);
        setPreviewVisible(true);

        return {type: fileType, link};
    }

    function handleOnUploadSuccess(res) {
        if (maxFiles === 1) {
            setValueInput(res.url);
        } else {
            setValueInput((previousValue) => {
                return [...previousValue, res.url];
            });
        }
    }

    function handleClosePreviewOnCancel() {
        setPreviewVisible(false);
    }

    function handleOnChange(info) {
        const {status} = info.file;
        let list = _.filter(info.fileList, (file) => file.status !== 'error');
        if (list.length > maxFiles) {
            list = _.slice(list, 0, maxFiles);
        }

        setFileList(
            list.map((item, index) => {
                if (item.response && item.response.success) {
                    return {uid: index, name: item.response.data.name, status: 'done', url: item.response.data.url};
                }
                return item;
            })
        );

        if (status === 'done') {
            handleOnUploadSuccess(info.file.response.data);
            message.success(`${info.file.name} tải lên thành công.`);
        } else if (status === 'error') {
            message.error(`Lỗi dữ liệu.`);
        }
    }

    function validateFile(file, width, height) {
        if (type === 'video') {
            const isVideo = ['video/mp4', 'video/quicktime'].includes(file.type);
            if (!isVideo) {
                message.error(
                    `Định dạng file ${file.type} không được chấp nhận vui lòng chọn  1 trong các đạnh dạng (.mp4)`
                );
                return false;
            }
            const fileSize = (file.size / 1000 / 1000).toFixed(2);
            if (!(fileSize < maxFileSizes)) {
                message.error(`File video không được quá ${maxFileSizes}MB! (kích thước file hiện tại ${fileSize}MB) `);
                return false;
            }
            return isVideo && fileSize;
        }
        if (type === 'image') {
            const isImg = imageType.includes(file.type);
            if (!isImg) {
                message.error(
                    `Định dạng file ${file.type} không được chấp nhận. Chỉ chấp nhận định dạng ${imageType}'`
                );
                return false;
            }
            const fileSize = (file.size / 1000 / 1000).toFixed(2);
            if (!(fileSize < maxFileSizes)) {
                message.error(
                    `File hình ảnh không được quá ${maxFileSizes}MB! (kích thước file hiện tại ${fileSize}MB) `
                );
                return false;
            }
            if (imageWidth && imageWidth !== width && imageHeight && imageHeight !== height) {
                message.error(
                    `Chỉ chấp nhận kích thước ${imageWidth}x${imageHeight} px (kích thước file hiện tại ${width}x${height})`
                );
                return false;
            }

            if (imageWidth && imageWidth !== width) {
                message.error(
                    `Chỉ chấp nhận kích thước chiều dài ${imageWidth} px (kích thước file hiện tại ${width}x${height}) `
                );
                return false;
            }
            if (imageHeight && imageHeight !== height) {
                message.error(
                    `Chỉ chấp nhận kích thước độ cao ${imageHeight} px (kích thước file hiện tại ${width}x${height})`
                );
                return false;
            }

            return isImg && fileSize;
        }
        return true;
    }

    async function getFileDimension(file) {
        const reader = new FileReader();
        const image = new Image();
        // eslint-disable-next-line func-names
        reader.onload = function () {
            image.src = reader.result;
        };

        await reader.readAsDataURL(file);

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line func-names
            if (type === 'image') {
                image.onload = function () {
                    // eslint-disable-next-line no-shadow
                    const {width, height} = image;

                    if (validateFile(file, width, height)) {
                        resolve(validateFile(file, width, height));
                    } else {
                        reject();
                    }
                };
            } else if (validateFile(file)) {
                resolve(validateFile(file));
            } else {
                reject();
            }
        });
    }
    // eslint-disable-next-line consistent-return
    function handleOnBeforeUpload(file) {
        return getFileDimension(file);
    }

    const uploadProps = {
        itemRender: (originNode, file, list) => {
            function handleSelectThumbOnCallback() {
                const maskFileExits = [...list];
                const firstItem = maskFileExits[0];
                maskFileExits[0] = file;
                maskFileExits[file.uid] = firstItem;
                const maskFileWaiting = maskFileExits.filter((item) => item.status !== 'done');
                const maskFileDone = maskFileExits.filter((item) => item.status === 'done');
                if (maxFiles > 1) {
                    setValueInput(
                        maskFileDone.map((item) => {
                            return item.url;
                        })
                    );
                    setFileList([
                        ...maskFileDone.map((item, index) => {
                            return {uid: index, name: item.name, url: item.url, status: 'done'};
                        }),
                        ...maskFileWaiting,
                    ]);
                }
            }
            function handleOpenPreviewOnClick() {
                handleOnPreview(file);
            }

            function handleRemoveItemOnClick() {
                let newPreviousValue;
                if (typeof valueInput === 'string') {
                    newPreviousValue = '';
                } else {
                    newPreviousValue = [...valueInput];
                    newPreviousValue.splice(_.indexOf(newPreviousValue, file.url), 1);
                }
                const filteredList = _.filter(list, (item) => item.uid !== file.uid);
                const filteredListWaiting = filteredList.filter((item) => item.status !== 'done');
                const filteredListDone = filteredList.filter((item) => item.status === 'done');
                setValueInput(newPreviousValue);
                setFileList([
                    ...filteredListDone.map((item, index) => {
                        return {uid: index, name: item.name, url: item.url, status: 'done'};
                    }),
                    ...filteredListWaiting,
                ]);
            }
            return (
                <>
                    {file.status === 'uploading' ? (
                        originNode
                    ) : (
                        <div className='ant-upload-list-item'>
                            <div className='ant-upload-list-item-info'>
                                <span className='ant-upload-span'>
                                    {type === 'video' ? (
                                        <>
                                            {file.response ? (
                                                <VideoPlayer
                                                    src={`${process.env.REACT_APP_ASSET_URL}/${file.response.data.name}`}
                                                    playerId='upload'
                                                    autoPlay
                                                    muted
                                                />
                                            ) : (
                                                <VideoPlayer
                                                    src={`${process.env.REACT_APP_ASSET_URL}/${file.name}`}
                                                    playerId='upload'
                                                    autoPlay
                                                    muted
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {file.response && file.response.success ? (
                                                <LazyImage
                                                    className='ant-upload-image'
                                                    src={formatUrlImage(file.response.data.url)}
                                                />
                                            ) : (
                                                <LazyImage
                                                    className='ant-upload-image'
                                                    src={formatUrlImage(file.url)}
                                                />
                                            )}
                                        </>
                                    )}
                                </span>
                            </div>
                            <span className='ant-upload-list-item-actions'>
                                <PlayCircleOutlined className='anticon' onClick={handleOpenPreviewOnClick} />
                                <DeleteOutlined className='anticon' onClick={handleRemoveItemOnClick} />
                                {maxFiles > 1 && (
                                    <PushpinOutlined className='anticon' onClick={handleSelectThumbOnCallback} />
                                )}
                            </span>
                        </div>
                    )}
                </>
            );
        },
    };
    useEffect(() => {
        if (!_.isEqual(defaultValue, fileList)) {
            if (type === 'image' && maxFiles === 1 && defaultValue[name]) {
                setFileList([
                    {
                        uid: defaultValue[name],
                        name: defaultValue[name],
                        url: defaultValue[name],
                        status: 'done',
                    },
                ]);
            }
            if (type === 'image' && maxFiles > 1 && defaultValue[name]) {
                setFileList(
                    _.map(defaultValue[name], (item, index) => {
                        return {
                            uid: index,
                            name: item,
                            url: item,
                            status: 'done',
                        };
                    })
                );
            } else if (type === 'video' && defaultValue[name]) {
                setFileList([
                    {
                        uid: defaultValue[name],
                        name: defaultValue[name],
                        url: defaultValue[name],
                        status: 'done',
                    },
                ]);
            }

            setValueInput(defaultValue[name] || []);
        }
        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        let value = valueInput;

        if (value) {
            if (typeof value === 'string') {
                try {
                    value = JSON.parse(value);
                    // eslint-disable-next-line no-empty
                } catch (e) {}
            }
            if (maxFiles > 1) {
                if (!Array.isArray(value)) {
                    value = [value];
                }
            }
            if (onChange) {
                onChange(value);
            }
        }

        control.setFieldsValue({[name]: value});
        // eslint-disable-next-line
    }, [valueInput, onChange]);

    return (
        <Form.Item label={<TranslationText id={label} />} onChange={onChange} className='ant-form-item-upload'>
            <Upload
                name={type}
                action={action[type].url}
                multiple={multiple}
                listType={listType}
                accept={accept}
                withCredentials
                onChange={handleOnChange}
                fileList={fileList}
                onPreview={handleOnPreview}
                beforeUpload={handleOnBeforeUpload}
                disabled={disabled}
                className={
                    type === 'image'
                        ? `${className} ${listStyle} image-upload`
                        : `${className} ${listStyle} video-upload`
                }
                {...uploadProps}
            >
                {fileList.length < maxFiles && (
                    <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                    </p>
                )}
            </Upload>
            <Form.Item name={name} rules={rules} hidden={hidden} noStyle>
                <Input />
            </Form.Item>
            {type === 'image' ? (
                <Modal
                    className='upload-preview-modal'
                    visible={previewVisible}
                    footer={false}
                    closable
                    onCancel={handleClosePreviewOnCancel}
                >
                    <LazyImage src={formatUrlImage(previewImage, 300)} alt={`${previewImage}`} />
                </Modal>
            ) : (
                <Modal
                    className='upload-preview-modal'
                    visible={previewVisible}
                    footer={false}
                    closable
                    onCancel={handleClosePreviewOnCancel}
                >
                    <VideoPlayer src={formatUrlAsset(previewImage)} playerId='modal' />
                </Modal>
            )}
        </Form.Item>
    );
};
export default AvUpload;
