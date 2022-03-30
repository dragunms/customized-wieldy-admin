import React from 'react';
import {Form, Input} from 'antd';
import {useDispatch} from 'react-redux';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import {Link} from 'react-router-dom';

import AvForm from 'src/components/Form/AvForm';
import LoadingButton from 'src/components/LoadingButton';
import TranslationText from 'src/components/TranslationText';

import {LOGIN_BY_EMAIL_PATH} from 'src/constants/subPaths';

import {sendResetPassword} from 'src/redux/auth/action';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [formControl] = Form.useForm();

    function handleOnSubmit(values) {
        dispatch(sendResetPassword(values.email));
    }

    return (
        <div className='gx-login-container'>
            <div className='gx-login-content'>
                <div className='gx-login-header gx-text-center'>
                    <h1 className='gx-login-title'>Sign In</h1>
                </div>
                <AvForm
                    initialValues={{remember: true}}
                    form={formControl}
                    name='basic'
                    onSubmit={handleOnSubmit}
                    validates={{
                        email: [
                            {required: true, message: <TranslationText id='validate.email_required' />},
                            {email: true, message: <TranslationText id='validate.email_error' />},
                        ],
                    }}
                    className='gx-signin-form gx-form-row0'
                >
                    <Form.Item name='email'>
                        <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='Email' />
                    </Form.Item>
                    <Form.Item name='remember' valuePropName='checked'>
                        <Link to={LOGIN_BY_EMAIL_PATH.PATH} className='gx-login-form-forgot'>
                            <TranslationText id='auth.back_to_home' />
                        </Link>
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

export default ForgotPasswordPage;
