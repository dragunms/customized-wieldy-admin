import _ from 'lodash';
import {Form, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

import TranslationText from 'src/components/TranslationText';

const {Option} = Select;

const AvSearchSelect = ({
    name,
    label = '',
    mode,
    placeholder,
    rules,
    serviceAPI,
    labelField = 'label',
    valueField = 'value',
    onChange,
    defaultValue,
    disabled = false,
    permanentLock = false,
}) => {
    const [isDisable, setIsDisable] = useState(disabled);
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState([]);

    let lastFetchId = 0;

    function getOptionLabel(option) {
        return option[labelField];
    }

    function getOptionValue(option) {
        return option[valueField];
    }

    function handleDisableInput() {
        if (permanentLock) {
            setIsDisable(true);
        } else setIsDisable(!isDisable);
    }

    function handleFetchDataOnSearch(values) {
        lastFetchId += 1;
        const fetchId = lastFetchId;
        setFetching(true);
        setData([]);
        serviceAPI({keywords: values})
            .then((body) => {
                if (fetchId !== lastFetchId) {
                    // for fetch callback order
                    return;
                }

                const result = body.data.docs.map((item) => ({
                    [labelField]: item[labelField],
                    [valueField]: item[valueField],
                }));
                setData(result);
                setFetching(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const fetchUser = _.debounce(handleFetchDataOnSearch, 800);

    function handleOnChange(values) {
        setValue(values);
        setFetching(false);
        if (onChange) {
            onChange(values);
        }
    }
    useEffect(() => {
        if (defaultValue) {
            setData([defaultValue]);
        }
    }, [defaultValue]);

    useEffect(() => {
        setIsDisable(disabled);
    }, [disabled]);

    return (
        <Form.Item label={<TranslationText id={label} />} rules={rules} name={name}>
            <Select
                showSearch
                mode={mode}
                placeholder={placeholder}
                onSearch={fetchUser}
                onChange={handleOnChange}
                value={value}
                getPopupContainer={(trigger) => trigger.parentNode}
                notFoundContent={fetching ? <Spin size='small' /> : null}
                defaultActiveFirstOption={false}
                filterOption={false}
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
                {data.map((item, index) => {
                    if (_.isEmpty(item)) {
                        return '';
                    }
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
export default AvSearchSelect;
