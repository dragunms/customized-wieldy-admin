import {DatePicker, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';

import TranslationText from 'src/components/TranslationText';

const AvDatePicker = ({
    name,
    label = '',
    placeholder,
    format = 'DD/MM/YYYY',
    rules,
    onChange,
    defaultValue,
    control,
    inputProps = {},
    customValue = null,
}) => {
    const [value, setValue] = useState(customValue);

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
        if (!defaultValue[name] && name === 'end_at') {
            // eslint-disable-next-line no-param-reassign
            defaultValue.end_at = moment().add(defaultValue.duration, 'days').unix();
        }

        if (defaultValue[name]) {
            setValue(defaultValue[name]);
        }

        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        if (customValue) {
            setValue(customValue);
        }
        // eslint-disable-next-line
    }, [customValue]);

    useEffect(() => {
        control.setFieldsValue({[name]: value});
        // eslint-disable-next-line
    }, [value]);
    return (
        <>
            <Form.Item label={<TranslationText id={label} />}>
                <DatePicker
                    className='gx-w-100'
                    placeholder={placeholder}
                    format={format}
                    onChange={handleOnChange}
                    value={value ? moment(value, 'X') : ''}
                    disabledDate={(d) => !d || d.isSameOrBefore(moment.unix(0))}
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
export default AvDatePicker;
