import './styles.less';

import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Button, Drawer, Form} from 'antd';
import {DownOutlined, SyncOutlined, UpOutlined} from '@ant-design/icons';
import querystring from 'querystring';
import {withRouter} from 'react-router-dom';
import omitEmpty from 'omit-empty';

import {useAddress} from 'src/hook/useAddress';

import StickyFilter from './StickyFilter';
import AvForm from 'src/components/Form/AvForm';
import AvTextInput from 'src/components/Form/AvTextInput';
import LoadingButton from 'src/components/LoadingButton';
import TranslationText from 'src/components/TranslationText';
import AvSwitch from 'src/components/Form/AvSwitch';
import AvSelect from 'src/components/Form/AvSelect';
import AvRadioGroup from 'src/components/Form/AvRadioGroup';
import AvDatePicker from 'src/components/Form/AvDatePicker';
import AvNumericInput from 'src/components/Form/AvNumericInput';
import AvSearchSelect from 'src/components/Form/AvSearchSelect';

import history from 'src/redux/history';

const FilterData = ({reducers, sortFields, searchFields, customSearch, location}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectDistricts, setSelectDistricts] = useState([]);
    const [params, setParams] = useState(querystring.decode(location.search.replace('?', '')));
    const {getProvinces, getDistrictsByProvinceId} = useAddress();

    const [formControl] = Form.useForm();

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    const [order, setOrder] = useState({
        sort_by: params.sort_by,
        sort_type: params.sort_by && params.sort_type === 'asc' ? 'asc' : 'desc',
    });

    function handleSortOnClick(col) {
        let sortType = 'desc';
        if (order.sort_type === 'desc') {
            sortType = 'asc';
        }
        setOrder({
            sort_by: col,
            sort_type: sortType,
        });
    }

    function handleClearFilterOnClick() {
        setParams({});
        setOrder({sort_by: null, sort_type: null});
        formControl.resetFields();
    }
    function handleProvinceOnChange(value) {
        if (value) {
            setSelectDistricts(getDistrictsByProvinceId(value));
            formControl.setFieldsValue({district_id: ''});
        }
    }

    function handleOnSubmit(values) {
        const submitParams = {
            ...params,
            ...values,
            ...order,
        };
        _.map(submitParams, (value, key) => {
            if (value === null || value === undefined || value === '') {
                delete submitParams[key];
            }
        });
        delete submitParams.page;
        history.replace(`${location.pathname}?${querystring.encode(omitEmpty(submitParams))}`);
    }

    useEffect(() => {
        if (isFilterOpen) {
            formControl.resetFields();
        }
        // eslint-disable-next-line
    }, [params]);

    const getCustomizerContent = () => {
        return (
            <StickyFilter className='gx-customizer'>
                <AvForm form={formControl} defaultValues={params} onSubmit={handleOnSubmit}>
                    <>
                        <LoadingButton type='primary'>
                            <TranslationText id='label.filter' />
                        </LoadingButton>
                        <Button onClick={handleClearFilterOnClick}>
                            <SyncOutlined />
                        </Button>
                        {!_.isEmpty(sortFields) && (
                            <p>
                                <TranslationText id='label.sort' />
                            </p>
                        )}

                        <div className='gx-customizer-flex-row'>
                            {!_.isEmpty(sortFields) && (
                                <>
                                    {sortFields.map((item, index) => {
                                        let icon = '';
                                        if (order.sort_by === item) {
                                            icon = <DownOutlined className='gx-fs-xs' />;
                                            if (order.sort_type === 'asc') {
                                                icon = <UpOutlined className='gx-fs-xs' />;
                                            }
                                        }
                                        return (
                                            <div
                                                key={index.toString()}
                                                className='ml-3 mt-2 d-flex flex-row justify-content-between mb-2 gx-customizer-block'
                                            >
                                                <Button onClick={() => handleSortOnClick(item)}>
                                                    <TranslationText id={`field.${item}`} />
                                                    &nbsp; {icon}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </>

                    {!_.isEmpty(searchFields) && (
                        <>
                            {searchFields.map((item, index) => {
                                let field = <AvTextInput name={item} label={`field.${item}`} />;
                                if (customSearch[item]) {
                                    const {type} = customSearch[item];
                                    let {list} = customSearch[item];
                                    if (customSearch[item].reducer) {
                                        list = reducers.data[customSearch[item].reducer];
                                    }

                                    if (customSearch[item].api) {
                                        list = customSearch[item].api;
                                    }
                                    if (item === 'province_id') {
                                        list = getProvinces();
                                    }
                                    if (item === 'district_id') {
                                        list = selectDistricts;
                                    }
                                    switch (type) {
                                        case 'switch':
                                            field = (
                                                <AvSwitch
                                                    name={item}
                                                    label={`field.${item}`}
                                                    control={formControl}
                                                    unTouched
                                                />
                                            );
                                            break;
                                        case 'select':
                                            field = (
                                                <AvSelect
                                                    name={item}
                                                    label={`field.${item}`}
                                                    options={list}
                                                    control={formControl}
                                                />
                                            );
                                            break;
                                        case 'searchSelect':
                                            field = (
                                                <AvSearchSelect
                                                    name={item}
                                                    label={`field.${item}`}
                                                    valueField='value'
                                                    labelField='text'
                                                    control={formControl}
                                                    serviceAPI={list}
                                                />
                                            );
                                            break;
                                        case 'radio':
                                            field = (
                                                <AvRadioGroup
                                                    name={item}
                                                    label={`field.${item}`}
                                                    data={list}
                                                    control={formControl}
                                                />
                                            );
                                            break;
                                        case 'address':
                                            field = (
                                                <AvSelect
                                                    name={item}
                                                    label={`field.${item}`}
                                                    options={list}
                                                    onChange={
                                                        item === 'province_id' ? handleProvinceOnChange : undefined
                                                    }
                                                    labelField='name'
                                                    valueField='id'
                                                    control={formControl}
                                                />
                                            );
                                            break;
                                        case 'date_range':
                                            field = (
                                                <>
                                                    <AvDatePicker
                                                        name={`${item}_start`}
                                                        label={`field.${item}_start`}
                                                        control={formControl}
                                                    />
                                                    <AvDatePicker
                                                        name={`${item}_end`}
                                                        label={`field.${item}_end`}
                                                        control={formControl}
                                                    />
                                                </>
                                            );
                                            break;
                                        case 'number_range':
                                            field = (
                                                <>
                                                    <AvNumericInput
                                                        name={`${item}_start`}
                                                        label={`field.${item}_start`}
                                                    />
                                                    <AvNumericInput name={`${item}_end`} label={`field.${item}_end`} />
                                                </>
                                            );
                                            break;
                                        case 'hidden':
                                            field = <></>;
                                            break;
                                        default:
                                            field = <AvTextInput name={item} label={`field.${item}`} />;
                                            break;
                                    }
                                }
                                return <React.Fragment key={index.toString()}>{field}</React.Fragment>;
                            })}
                        </>
                    )}
                </AvForm>
            </StickyFilter>
        );
    };

    return (
        <>
            {!_.isEmpty(searchFields) && (
                <>
                    <Drawer placement='right' closable={false} onClose={toggleFilter} visible={isFilterOpen}>
                        {getCustomizerContent()}
                    </Drawer>
                    <div className='gx-customizer-option'>
                        <Button type='primary' onClick={toggleFilter}>
                            <i className='icon icon-search-new gx-d-block' />
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default withRouter(FilterData);
