import {Form, TimePicker, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';

import TranslationText from 'src/components/TranslationText';

const AvTimePicker = ({
    name,
    label = '',
    placeholder,
    format = 'HH:mm',
    rules,
    onChange,
    defaultValue,
    control,
    inputProps = {},
}) => {
    const [value, setValue] = useState(null);

    function handleOnChange(e) {
        if (e) {
            const time = moment(e).unix();
            setValue(time);
            if (onChange) {
                onChange(time);
            }
        } else {
            setValue('');
        }
    }

    useEffect(() => {
        if (defaultValue[name]) {
            setValue(defaultValue[name]);
        }
        // eslint-disable-next-line
    }, [defaultValue[name]]);

    useEffect(() => {
        control.setFieldsValue({[name]: value});
        // eslint-disable-next-line
    }, [value]);

    return (
        <>
            <Form.Item label={<TranslationText id={label} />}>
                <TimePicker
                    className='gx-w-100'
                    placeholder={placeholder}
                    format={format}
                    onChange={handleOnChange}
                    // onSelect={handleOnSelect}
                    value={value ? moment(value, 'X') : ''}
                    showNow={false}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    {...inputProps}
                />
                <Form.Item
                    name={name}
                    initialValue={value ? moment(value).unix() : undefined}
                    rules={rules}
                    hidden
                    noStyle
                >
                    <Input name={name} />
                </Form.Item>
            </Form.Item>
        </>
    );
};
export default AvTimePicker;
