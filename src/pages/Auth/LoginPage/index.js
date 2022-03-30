import React from 'react';
import {Form} from 'antd';
import {useDispatch} from 'react-redux';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';

import AvForm from 'src/components/Form/AvForm';
import AvTextInput from 'src/components/Form/AvTextInput';
import LoadingButton from 'src/components/LoadingButton';
import TranslationText from 'src/components/TranslationText';

import {login} from 'src/redux/auth/action';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [formControl] = Form.useForm();

    function handleOnSubmit(values) {
        dispatch(login(values.email, values.password));
    }

    return (
        <div className='gx-login-container'>
            <div className='gx-login-content'>
                <div className='gx-login-header gx-text-center'>
                    <h1 className='gx-login-title'>
                        <TranslationText id='auth.login' />
                    </h1>
                </div>
                <AvForm
                    defaultValues={{remember: true}}
                    form={formControl}
                    onSubmit={handleOnSubmit}
                    className='gx-signin-form gx-form-row0'
                >
                    <Form.Item noStyle>
                        <AvTextInput
                            name='email'
                            placeholder='Email'
                            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                            rules={[
                                {required: true, message: <TranslationText id='validate.email_required' />},
                                {
                                    transform(value) {
                                        return value ? value.trim() : '';
                                    },
                                    type: 'email',
                                    message: <TranslationText id='validate.email_type' />,
                                },
                                {type: 'string', message: <TranslationText id='validate.title_type' />},
                                {
                                    transform(value) {
                                        return value ? value.trim() : '';
                                    },
                                    type: 'string',
                                    min: 6,
                                    message: <TranslationText id='validate.email_min_length' values={{min: 6}} />,
                                },
                                {
                                    transform(value) {
                                        return value ? value.trim() : '';
                                    },
                                    type: 'string',
                                    max: 70,
                                    message: <TranslationText id='validate.email_max_length' values={{max: 70}} />,
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <AvTextInput
                            name='password'
                            type='password'
                            placeholder='Password'
                            prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                            suffix=' '
                            rules={[
                                {required: true, message: <TranslationText id='validate.password_required' />},
                                {type: 'string', message: <TranslationText id='validate.title_type' />},
                                {
                                    transform(value) {
                                        return value ? value.trim() : '';
                                    },
                                    type: 'string',
                                    min: 6,
                                    message: <TranslationText id='validate.email_min_length' values={{min: 6}} />,
                                },
                                {
                                    transform(value) {
                                        return value ? value.trim() : '';
                                    },
                                    type: 'string',
                                    max: 70,
                                    message: <TranslationText id='validate.email_max_length' values={{max: 70}} />,
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item className='gx-text-center'>
                        <LoadingButton>
                            <TranslationText id='label.confirm' />
                        </LoadingButton>
                    </Form.Item>
                </AvForm>
            </div>
        </div>
    );
};

export default LoginPage;
