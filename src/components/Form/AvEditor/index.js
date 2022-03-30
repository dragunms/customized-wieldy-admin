import React, {useEffect, useState} from 'react';
import {Form, Input} from 'antd';
import TinymceEditor from 'src/components/Form/AvEditor/TinymceEditor';

import TranslationText from 'src/components/TranslationText';

import {sanitize} from 'src/utilities/util';

const AvEditor = ({name, label, rules, defaultValue, onChange, control}) => {
    const [editorValue, setEditorValue] = useState('');
    const [inputValue, setInputValue] = useState(null);

    function onChangeContent(value) {
        value = sanitize(value);
        setInputValue(value);
        control.setFieldsValue({[name]: value});
    }

    useEffect(() => {
        setEditorValue(defaultValue[name]);
        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        return function cleanup() {
            setEditorValue('');
        };
    }, []);
    return (
        <Form.Item label={<TranslationText id={label} />}>
            <TinymceEditor name={name} value={editorValue} onChange={onChangeContent} />
            <Form.Item name={name} rules={rules} initialValue={inputValue} hidden noStyle>
                <Input onChange={onChange} />
            </Form.Item>
        </Form.Item>
    );
};

export default AvEditor;
