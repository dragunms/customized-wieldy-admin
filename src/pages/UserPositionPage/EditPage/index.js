import './styles.less';

import _ from 'lodash';
import React from 'react';
import {Card, Checkbox, Form} from 'antd';

import withModify from 'src/HOC/withModify';

import TranslationText from 'src/components/TranslationText';
import AvTextInput from 'src/components/Form/AvTextInput';
import UserPositionTable from './UserPositionTable';

import {USER_POSITION_ROLE} from 'src/constants/roles';

import {
    clearUserPosition,
    createUserPosition,
    getOneUserPosition,
    updateUserPosition,
} from 'src/redux/userPositions/action';

const EditPage = ({formControl, data}) => {
    return (
        <>
            <Card className='gx-card user-position' title={<TranslationText id='label.user_position_section' />}>
                <AvTextInput
                    defaultValue={data}
                    name='name'
                    label='field.name'
                    rules={[
                        {required: true, message: <TranslationText id='validate.name_required' />},
                        {type: 'string', message: <TranslationText id='validate.name_type' />},
                        {
                            min: 1,
                            message: <TranslationText id='validate.name_min_length' values={{min: 1}} />,
                        },
                        {
                            max: 50,
                            message: <TranslationText id='validate.name_max_length' values={{max: 50}} />,
                        },
                    ]}
                    maxLength={50}
                />
                <Form.Item name='roles'>
                    <Checkbox.Group className='checkbox-group'>
                        <UserPositionTable formControl={formControl} data={data} />
                    </Checkbox.Group>
                </Form.Item>
            </Card>
        </>
    );
};

function handleBeforeSubmit(values) {
    return {name: values.name, roles: _.uniq(values.roles)};
}

export default withModify(
    'userPositions',
    {
        roles: [USER_POSITION_ROLE.UPDATE, USER_POSITION_ROLE.CREATE],
    },
    {getOne: getOneUserPosition, create: createUserPosition, update: updateUserPosition, clear: clearUserPosition},
    false,
    null,
    handleBeforeSubmit
)(EditPage);
