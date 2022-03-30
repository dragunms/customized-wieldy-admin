import './styles.less';

import {Form, Input, Switch} from 'antd';
import React, {useEffect, useState} from 'react';

import TranslationText from 'src/components/TranslationText';

const AvSwitch = ({
    name,
    label = '',
    defaultValue,
    onChange,
    rules,
    control,
    type = 'horizontal',
    position = 'left',
    className = '',
    disabled = false,
    unTouched = false,
}) => {
    const [value, setValue] = useState(false);
    const [initValue, setInitValue] = useState(unTouched);

    function handleOnChange(data) {
        const result = data ? 1 : 0;
        setValue(result);
        if (onChange) {
            onChange(data);
        }
    }

    useEffect(() => {
        if (defaultValue) {
            if (defaultValue[name] !== undefined) {
                setValue(defaultValue[name]);
            }
        }
        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        control.setFieldsValue({[name]: Number(value)});
        if (initValue) {
            control.setFieldsValue({[name]: null});
            setInitValue(false);
        }
        // eslint-disable-next-line
    }, [value]);

    return (
        <>
            <Form.Item
                label={<TranslationText id={label} />}
                valuePropName='checked'
                className={`ant-switch-${type} ant-switch-${position} ${className}`}
            >
                <Switch
                    checked={!!Number(value)}
                    onChange={handleOnChange}
                    defaultChecked={Number(value)}
                    disabled={disabled}
                />
                <Form.Item name={name} rules={rules} initialValue={Number(value)} hidden noStyle>
                    <Input />
                </Form.Item>
            </Form.Item>
        </>
    );
};
export default AvSwitch;
