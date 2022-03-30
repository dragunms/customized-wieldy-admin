import {Form, Radio} from 'antd';
import React from 'react';
import _ from 'lodash';

import TranslationText from 'src/components/TranslationText';

const AvRadioGroup = ({
    name,
    label = '',
    rules,
    labelField = 'label',
    valueField = 'value',
    options = [],
    onChange,
}) => {
    return (
        <Form.Item label={<TranslationText id={label} />} rules={rules} name={name} onChange={onChange}>
            <Radio.Group>
                {_.map(options, (item, index) => {
                    return (
                        <Radio value={item[valueField]} key={index.toString()}>
                            {item[labelField]}
                        </Radio>
                    );
                })}
            </Radio.Group>
        </Form.Item>
    );
};
export default AvRadioGroup;
