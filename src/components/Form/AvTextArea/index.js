import {Form, Input} from 'antd';
import React from 'react';

import TranslationText from 'src/components/TranslationText';

const {TextArea} = Input;

const AvTextArea = ({name, label = '', placeholder, rules, onChange, rows = 4, maxLength = 255, disabled = false}) => {
    return (
        <Form.Item label={<TranslationText id={label} />} rules={rules} name={name}>
            <TextArea
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
                showCount
                maxLength={maxLength}
                disabled={disabled}
            />
        </Form.Item>
    );
};
export default AvTextArea;
