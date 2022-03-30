import './styles.less';

import _ from 'lodash';
import React from 'react';
import {Form, Radio} from 'antd';

import TranslationText from 'src/components/TranslationText';

const AvStatusRadioGroup = ({
    name,
    label,
    rules,
    labelField = 'label',
    valueField = 'value',
    options = [],
    onChange,
    position = 'left',
}) => {
    return (
        <Form.Item
            label={label ? <TranslationText id={label} /> : ''}
            rules={rules}
            name={name}
            onChange={onChange}
            className={`ant-status-radio-group ant-status-radio-group-${position}`}
        >
            <Radio.Group>
                {_.map(options, (item, index) => {
                    return (
                        <Radio value={item[valueField]} key={index.toString()} className={`button-${item.color}`}>
                            {item[labelField]}
                        </Radio>
                    );
                })}
            </Radio.Group>
        </Form.Item>
    );
};
export default AvStatusRadioGroup;
