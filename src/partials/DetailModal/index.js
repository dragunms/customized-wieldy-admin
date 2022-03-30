import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Descriptions, Empty} from 'antd';
import omitEmpty from 'omit-empty';

import {useAddress} from 'src/hook/useAddress';

import TranslationText from 'src/components/TranslationText';

import * as roles from 'src/constants/roles';

import {convertRelativeTime} from 'src/utilities/util';

import UserServiceAPI from 'src/apis/UserServiceAPI';

const DetailModal = ({data, ignore = []}) => {
    const [createdName, setCreatedName] = useState(null);
    const [updatedName, setUpdatedName] = useState(null);
    const {getProvinceNameById, getDistrictNameById} = useAddress();

    const {ROLE_TYPES, ...ROLES} = roles;
    let roleType = '';

    if (data.roles) {
        roleType = _.map(ROLES, (role, roleIndex) => {
            return _.map(role, (type, index) => {
                if (data.roles.includes(type)) {
                    return {role: roleIndex, role_type: index};
                }
                return '';
            });
        });
    }

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

        const timer = setTimeout(() => {}, 0);

        return function cleanup() {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [data]);

    function handleDescriptionItem(item, index) {
        switch (index) {
            case 'created_at':
                return convertRelativeTime(item);
            case 'modified_at':
                return convertRelativeTime(item);
            case 'end_at':
                return convertRelativeTime(item);
            case 'end_hot_at':
                return convertRelativeTime(item);
            case 'created_id':
                return createdName;
            case 'modified_id':
                return updatedName;
            case 'province_id':
                return getProvinceNameById(item);
            case 'district_id':
                return getDistrictNameById(item);
            case 'roles':
                return omitEmpty(roleType).map((list, listIndex) => {
                    return (
                        <div key={listIndex.toString()}>
                            {list.map((listitem, listItemIndex) => {
                                return (
                                    <div key={listItemIndex.toString()}>
                                        <TranslationText id={`roles.${listitem.role_type}`} />{' '}
                                        <TranslationText id={`roles.${listitem.role}`} />
                                    </div>
                                );
                            })}
                        </div>
                    );
                });

            default:
                return item.toString();
        }
    }
    const list = _.omit(data, ignore);
    return (
        <>
            {list ? (
                <Descriptions title={<TranslationText id='label.detail' />} column={1} bordered>
                    {_.map(list, (item, index) => {
                        return (
                            <Descriptions.Item label={<TranslationText id={`field.${index}`} />} key={index.toString()}>
                                {handleDescriptionItem(item, index)}
                            </Descriptions.Item>
                        );
                    })}
                </Descriptions>
            ) : (
                <Empty />
            )}
        </>
    );
};
export default DetailModal;
