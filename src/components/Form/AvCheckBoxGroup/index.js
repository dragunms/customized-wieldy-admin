import {Form, Checkbox} from 'antd';
import React from 'react';
import _ from 'lodash';

import TranslationText from 'src/components/TranslationText';

const AvCheckBoxGroup = ({name, label = '', rules, labelField = 'label', valueField = 'value', data = []}) => {
    return (
        <Form.Item rules={rules} name={name} label={<TranslationText id={label} />}>
            <Checkbox.Group>
                {_.map(data, (item, index) => {
                    return (
                        <Checkbox value={item[valueField]} key={index.toString()}>
                            {item[labelField]}
                        </Checkbox>
                    );
                })}
            </Checkbox.Group>
        </Form.Item>
    );
};
export default AvCheckBoxGroup;
