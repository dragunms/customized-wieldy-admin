import './styles.less';

import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Card, Checkbox, Divider, Form, Input, Tabs} from 'antd';
import moment from 'moment';
import omitEmpty from 'omit-empty';
import {useDispatch, useSelector} from 'react-redux';

import AvStatusRadioGroup from 'src/components/Form/AvStatusRadioGroup';
import TranslationText from 'src/components/TranslationText';
import AvTextInput from 'src/components/Form/AvTextInput';
import LoadingButton from 'src/components/LoadingButton';
import AvForm from 'src/components/Form/AvForm';
import CircularProgress from 'src/components/CircularProgress';
import withUser from '../withUser';

import {STATUS} from 'src/constants/dataVariable';

import UserServiceAPI from 'src/apis/UserServiceAPI';

import {convertRelativeTime} from 'src/utilities/util';

function HandleBeforeSubmit(values) {
    return values;
}

const withModify = (
    reducer,
    roles,
    actions,
    status = null,
    statusOptions = null,
    beforeSubmit = HandleBeforeSubmit,
    forceModify = true
) => (WrapperComponent) => {
    const HookModify = (props) => {
        const [formControl] = Form.useForm();
        const data = useSelector((state) => state[reducer].item);
        const loading = useSelector((state) => state.process.inProcess);

        const [createdName, setCreatedName] = useState(null);
        const [updatedName, setUpdatedName] = useState(null);
        const [showMessage, setShowMessage] = useState(false);

        const dispatch = useDispatch();

        function handleOnSubmit(formData) {
            let values = beforeSubmit(omitEmpty(formData));
            values = _.transform(values, (result, content, key) => {
                // eslint-disable-next-line no-param-reassign
                result[key] = content;
                return result;
            });

            const {id} = props.match.params;
            if (id) {
                dispatch(actions.update(id, values));
            } else {
                formControl.resetFields();
                dispatch(actions.create(values));
            }
        }

        function onChangeTime(e) {
            const type = e.target.getAttribute('data-type');
            const value = e.target.getAttribute('data-value');
            if (type === 'relative') {
                e.target.setAttribute('data-type', 'time');
                e.target.innerText = moment.unix(value).format(' H:m MM-DD-YYYY');
            } else {
                e.target.setAttribute('data-type', 'relative');
                e.target.innerText = convertRelativeTime(value);
            }
        }

        function handleShowMessageOnChange(e) {
            const selectedStatus = e.target.value;
            if (selectedStatus && Number(selectedStatus) === STATUS.REJECT) {
                setShowMessage(true);
            } else {
                setShowMessage(false);
            }
        }

        function handleForceModifyOnChange(e) {
            const result = e.target.checked ? 1 : 0;
            formControl.setFieldsValue({forceModify: result});
        }

        useEffect(() => {
            const {id} = props.match.params;
            if (id) {
                dispatch(actions.getOne(id));
            }
            return function cleanup() {
                dispatch(actions.clear());
            };
            // eslint-disable-next-line
        }, []);

        useEffect(() => {
            if (data.created_id) {
                UserServiceAPI.getOneInfo(data.created_id).then((res) => {
                    if (res.success) {
                        setCreatedName(res.data.name);
                    }
                });
            }

            if (data.modified_id) {
                UserServiceAPI.getOneInfo(data.modified_id).then((res) => {
                    if (res.success) {
                        setUpdatedName(res.data.name);
                    }
                });
            }

            const timer = setTimeout(() => {
                formControl.resetFields();
            }, 0);

            return function cleanup() {
                clearTimeout(timer);
            };
            // eslint-disable-next-line
        }, [data]);

        const tabs = {
            title: <TranslationText id='label.info_tab' />,
            content: (
                <Tabs.TabPane tab={<TranslationText id='label.info_tab' />} key='1' forceRender>
                    <WrapperComponent formControl={formControl} data={data} />
                </Tabs.TabPane>
            ),
        };

        return (
            <>
                {props.match.params.id && (
                    <Card className='gx-card'>
                        {!!data.created_at && (
                            <div>
                                <TranslationText id='field.created_at' />:
                                <span
                                    data-value={data.created_at}
                                    onClick={onChangeTime}
                                    className='preview-user-content'
                                >
                                    {convertRelativeTime(data.created_at)}
                                </span>
                                {createdName && <span className='text-success'> ({createdName})</span>}
                            </div>
                        )}
                        {!!data.modified_at && (
                            <div>
                                <TranslationText id='field.modified_at' />:
                                <span
                                    data-value={data.modified_at}
                                    onClick={onChangeTime}
                                    className='preview-user-content'
                                >
                                    {convertRelativeTime(data.modified_at)}
                                </span>
                                {updatedName && <span className='text-success'> ({updatedName})</span>}
                            </div>
                        )}
                    </Card>
                )}
                {loading ? (
                    <CircularProgress className='relative' />
                ) : (
                    <AvForm
                        defaultValues={data}
                        validates={{
                            name: [{required: true, message: 'Please input your name!'}],
                            slug: [{required: true, message: 'Slug is missing!'}],
                            thumb: [{required: true, message: 'thumb is missing!'}],
                        }}
                        form={formControl}
                        onSubmit={handleOnSubmit}
                    >
                        <Tabs defaultActiveKey='1'>{tabs.content}</Tabs>

                        <Form.Item name='forceModify' initialValue={forceModify ? 1 : 0} hidden noStyle>
                            <Input />
                        </Form.Item>
                        <Form.Item className='ant-submit-btn'>
                            {!!status && (
                                <>
                                    {showMessage && (
                                        <AvTextInput defaultValue={data} name='message' label='field.message' />
                                    )}
                                    <AvStatusRadioGroup
                                        name='status'
                                        options={statusOptions}
                                        control={formControl}
                                        position='right'
                                        onChange={handleShowMessageOnChange}
                                        rules={[
                                            {
                                                required: true,
                                                message: <TranslationText id='validate.status_required' />,
                                            },
                                        ]}
                                    />
                                </>
                            )}
                            <div className='custom-submit-btn'>
                                <LoadingButton className='gx-btn-success connected-btn'>
                                    <TranslationText id='label.confirm' />
                                </LoadingButton>
                                <span className='force-modify-checkbox'>
                                    <Divider type='vertical' />
                                    <Checkbox onChange={handleForceModifyOnChange} defaultChecked={forceModify} />
                                </span>
                            </div>
                        </Form.Item>
                    </AvForm>
                )}
            </>
        );
    };
    return withUser(roles.roles)(HookModify);
};
export default withModify;
