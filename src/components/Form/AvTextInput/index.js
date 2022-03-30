import './styles.less';

import {Form, Input, Divider} from 'antd';
import React, {useEffect, useState} from 'react';
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

import TranslationText from 'src/components/TranslationText';

const AvTextInput = ({
    name,
    label = '',
    placeholder,
    rules,
    type = 'text',
    onChange,
    disabled = false,
    hidden = false,
    defaultValue = '',
    maxLength,
    permanentLock,
    prefix,
    suffix,
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
        // eslint-disable-next-line
    }, [disabled]);
    return (
        <>
            <Form.Item label={label ? <TranslationText id={label} /> : ''} rules={rules} name={name} hidden={hidden}>
                <Input
                    type={type}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    disabled={isDisable}
                    allowClear
                    prefix={prefix}
                    suffix={
                        suffix || (
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
                        )
                    }
                    maxLength={maxLength}
                />
            </Form.Item>
        </>
    );
};
export default AvTextInput;
