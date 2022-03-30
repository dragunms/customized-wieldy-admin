import {Divider, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';

import TranslationText from 'src/components/TranslationText';
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

const AvPassWordInput = ({
    name,
    label = '',
    placeholder,
    rules,
    onChange,
    disabled = false,
    hidden = false,
    defaultValue = '',
    maxLength,
    permanentLock,
}) => {
    const [isDisable, setIsDisable] = useState(disabled);
    const [inputLength, setInputLength] = useState(0);
    function handleDisableInput() {
        if (permanentLock) {
            setIsDisable(true);
        } else setIsDisable(!isDisable);
    }
    function handleOnChange(value) {
        setInputLength(value.target.value.length);
        if (onChange) {
            onChange(value);
        }
    }
    useEffect(() => {
        if (defaultValue[name]) {
            setInputLength(defaultValue[name].length);
        }
        // eslint-disable-next-line
    }, [defaultValue]);

    useEffect(() => {
        setIsDisable(disabled);
    }, [disabled]);

    return (
        <Form.Item label={<TranslationText id={label} />} rules={rules} name={name} hidden={hidden}>
            <Input.Password
                placeholder={placeholder}
                onChange={handleOnChange}
                disabled={isDisable}
                allowClear
                iconRender={() => (
                    <>
                        <Divider type='vertical' />
                        {isDisable ? (
                            <div className='avtext-suffix'>
                                <LockOutlined onClick={handleDisableInput} />
                            </div>
                        ) : (
                            <div className='avtext-suffix'>
                                <UnlockOutlined onClick={handleDisableInput} />
                            </div>
                        )}
                        {maxLength && (
                            <>
                                <Divider type='vertical' />
                                <div className='avtext-suffix'>{inputLength}</div>

                                <div className='avtext-suffix'>/{maxLength}</div>
                            </>
                        )}
                    </>
                )}
                maxLength={maxLength}
                visibilityToggle
            />
        </Form.Item>
    );
};
export default AvPassWordInput;
