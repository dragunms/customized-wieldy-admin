import './styles.less';

import React from 'react';
import {Card, Row, Col} from 'antd';
import {useSelector} from 'react-redux';

import withModify from 'src/HOC/withModify';

import TranslationText from 'src/components/TranslationText';
import AvTextInput from 'src/components/Form/AvTextInput';
import AvSelect from 'src/components/Form/AvSelect';
import AvPassWordInput from 'src/components/Form/AvPassWordInput';

import {USER_ROLE} from 'src/constants/roles';
import {USER_STATUS_OPTIONS} from 'src/constants/dataOptions';

import {phoneNumberRegex} from 'src/utilities/regularExpression';

import {clearUser, createUser, getOneUser, updateUser} from 'src/redux/users/action';

const EditPage = ({data}) => {
    const userPositions = useSelector((state) => state.init.data.userPositions);

    return (
        <>
            <Card className='gx-card modify-page-card' title={<TranslationText id='label.user_section' />}>
                <Row>
                    <Col md={12} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='name'
                            label='field.name'
                            rules={[
                                {
                                    required: true,
                                    message: <TranslationText id='validate.name_required' />,
                                },
                                {
                                    type: 'string',
                                    message: <TranslationText id='validate.name_type' />,
                                },
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
                    </Col>
                    <Col md={12} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='email'
                            label='field.email'
                            rules={[
                                {
                                    required: true,
                                    message: <TranslationText id='validate.email_required' />,
                                },
                                {
                                    type: 'email',
                                    message: <TranslationText id='validate.email_type' />,
                                },
                                {
                                    min: 0,
                                    message: <TranslationText id='validate.email_min_length' values={{min: 0}} />,
                                },
                                {
                                    max: 255,
                                    message: <TranslationText id='validate.email_max_length' values={{max: 255}} />,
                                },
                            ]}
                        />
                    </Col>
                    <Col md={12} xs={24}>
                        <AvSelect name='position_id' label='field.position_id' options={userPositions} />
                    </Col>
                    <Col md={12} xs={24}>
                        <AvPassWordInput
                            defaultValue={data}
                            name='password'
                            label='field.password'
                            rules={[
                                {
                                    type: 'string',
                                    message: <TranslationText id='validate.password_type' />,
                                },
                                {
                                    min: 0,
                                    message: <TranslationText id='validate.password_min_length' values={{min: 0}} />,
                                },
                                {
                                    max: 255,
                                    message: <TranslationText id='validate.password_max_length' values={{max: 255}} />,
                                },
                            ]}
                            maxLength={255}
                        />
                    </Col>
                    <Col md={12} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='phone_number'
                            label='field.phone_number'
                            rules={[
                                {
                                    type: 'string',
                                    message: <TranslationText id='validate.phone_number_type' />,
                                },
                                {
                                    pattern: phoneNumberRegex,
                                    message: <TranslationText id='validate.phone_number_pattern' />,
                                },
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText id='validate.phone_number_min_length' values={{min: 0}} />
                                    ),
                                },
                                {
                                    max: 10,
                                    message: (
                                        <TranslationText id='validate.phone_number_max_length' values={{max: 10}} />
                                    ),
                                },
                            ]}
                            maxLength={10}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default withModify(
    'users',
    {
        roles: [USER_ROLE.UPDATE, USER_ROLE.CREATE],
    },
    {
        getOne: getOneUser,
        create: createUser,
        update: updateUser,
        clear: clearUser,
    },
    true,
    USER_STATUS_OPTIONS
)(EditPage);
