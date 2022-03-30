import './styles.less';
import React, {useState} from 'react';
import {Form, Input, Tooltip} from 'antd';

import TranslationText from 'src/components/TranslationText';

import {numericInputRegex} from 'src/utilities/regularExpression';

const AvNumericInput = ({
    name,
    label = '',
    values,
    rules,
    onChange,
    onBlur,
    placeholder = '',
    control,
    maxLength = 9,
    ...inputProps
}) => {
    const [value, setValue] = useState('');

    function setInputValue(data) {
        let inputValue = data.toString().split('.').join('');
        if (inputValue.length > maxLength) {
            inputValue = inputValue.substring(0, maxLength);
        }
        const num = Number(inputValue);

        if (!Number.isNaN(num)) {
            let numString = num.toString();
            numString = numString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');

            setValue(numString);
            control.setFieldsValue({[name]: numString});
        }
    }
    function handleOnChange(num) {
        const input = num.target;
        if ((!Number.isNaN(input) && numericInputRegex.test(input)) || input === '' || input === '-') {
            onChange(input);
        }
        setInputValue(input.value);
    }

    function formatNumber(input) {
        // eslint-disable-next-line no-param-reassign
        input += '';
        const list = input.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while (num.length > 3) {
            result = `,${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }

        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
    }

    function handleOnBlur() {
        const valueString = value.toString();
        if (valueString.charAt(value.length - 1) === '.' || valueString === '-') {
            onChange({value: valueString.slice(0, -1)});
        }
        if (onBlur) {
            onBlur();
        }
    }

    const tooltip = value ? (
        <span className='numeric-input-title'>{value !== '-' ? formatNumber(value) : '-'}</span>
    ) : (
        'Input a number'
    );
    return (
        <Tooltip trigger={['focus']} title={tooltip} placement='topLeft' overlayClassName='numeric-input'>
            <Form.Item label={<TranslationText id={label} />} rules={rules} name={name}>
                <Input
                    className='av-number-input'
                    type='number'
                    {...inputProps}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    placeholder={placeholder}
                    maxLength={25}
                    value={value}
                />
            </Form.Item>
        </Tooltip>
    );
};

export default AvNumericInput;
