import React from 'react';
import {Form} from 'antd';
import {useDispatch} from 'react-redux';

import AvForm from 'src/components/Form/AvForm';
import LoadingButton from 'src/components/LoadingButton';
import TranslationText from 'src/components/TranslationText';
import AvPassWordInput from 'src/components/Form/AvPassWordInput';

import {changePassword} from 'src/redux/auth/action';

const ChangePasswordPage = () => {
    const dispatch = useDispatch();
    const [formControl] = Form.useForm();

    function handleOnSubmit(values) {
        dispatch(changePassword(values.password, values.new_password));
    }

    return (
        <div className='gx-login-container'>
            <div className='gx-login-content'>
                <div className='gx-login-header gx-text-center'>
                    <h1 className='gx-login-title'>
                        <TranslationText id='label.change_password' />
                    </h1>
                </div>
                <AvForm
                    initialValues={{remember: true}}
                    form={formControl}
                    name='basic'
                    onSubmit={handleOnSubmit}
                    validates={{
                        password: [{required: true, message: <TranslationText id='validate.password_required' />}],
                        new_password: [
                            {required: true, message: <TranslationText id='validate.new_password_required' />},
                        ],
                        confirm_password: [
                            {required: true, message: <TranslationText id='validate.confirm_password_required' />},
                        ],
                    }}
                    className='gx-signin-form gx-form-row0'
                >
                    <AvPassWordInput name='password' label='field.password' />
                    <AvPassWordInput name='new_password' label='field.new_password' />
                    <AvPassWordInput name='confirm_password' label='field.confirm_password' />
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

export default ChangePasswordPage;
