import {Form, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

import TranslationText from 'src/components/TranslationText';

const {Option} = Select;

const AvSelect = ({
    name,
    label = '',
    mode,
    placeholder,
    rules,
    options = {},
    labelField = 'label',
    valueField = 'value',
    onChange,
    defaultValue,
    disabled = false,
    permanentLock,
    className = '',
}) => {
    const [selectValue, setSelectValue] = useState([]);
    const [isDisable, setIsDisable] = useState(disabled);

    function handleDisableInput() {
        if (permanentLock) {
            setIsDisable(true);
        } else setIsDisable(!isDisable);
    }

    function getOptionLabel(option) {
        return option[labelField];
    }

    function getOptionValue(option) {
        return option[valueField];
    }

    function handleOnChange(values) {
        if (onChange) {
            onChange(values);
        }
    }

    useEffect(() => {
        if (defaultValue) {
            setSelectValue(defaultValue[name]);
        }
        return function cleanup() {
            setSelectValue([]);
        };
        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        setIsDisable(disabled);
    }, [disabled]);

    return (
        <Form.Item
            label={<TranslationText id={label} />}
            rules={rules}
            name={name}
            initialValue={selectValue}
            className={className}
        >
            <Select
                mode={mode}
                placeholder={placeholder}
                onChange={handleOnChange}
                getPopupContainer={(trigger) => trigger.parentNode}
                suffixIcon={
                    <>
                        {isDisable ? (
                            <LockOutlined onClick={handleDisableInput} />
                        ) : (
                            <UnlockOutlined onClick={handleDisableInput} />
                        )}
                    </>
                }
                disabled={isDisable}
            >
                {options.map((item, index) => {
                    return (
                        <Option key={index.toString()} value={getOptionValue(item)}>
                            {getOptionLabel(item)}
                        </Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
};
export default AvSelect;
