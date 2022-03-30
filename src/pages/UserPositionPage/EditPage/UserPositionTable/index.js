import _ from 'lodash';
import {Checkbox, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import omitEmpty from 'omit-empty';

import TranslationText from 'src/components/TranslationText';

import * as roles from 'src/constants/roles';

const UserPositionTable = ({formControl, data}) => {
    const [checkedList, setCheckedList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const {ROLE_TYPES, ...ROLES} = roles;

    function handleIsEditableRoles(value) {
        if (isEdit && user) {
            return user.position.roles.includes(value);
        }
        return true;
    }

    /* Merge ROLES and ROLE_TYPES to one array for table */
    const positions = _.map(ROLES, (role, name) => {
        const roleType = _.map(role, (type, index) => {
            if (handleIsEditableRoles(type)) return {[index]: type};
            return '';
        });
        const validRole = omitEmpty(roleType);
        if (validRole) {
            roleType.unshift({title: name});
        }
        /* add title to roleType */
        return Object.assign({}, ...roleType);
    });
    const columns = _.map(ROLE_TYPES, (type) => {
        return {
            title: () => {
                function handleSelectAllColumnOnChange(e) {
                    const newList = _.map(ROLES, (name) => {
                        return name[type];
                    });
                    if (e.target.checked) {
                        setCheckedList((prev) => [...prev, ...newList]);
                    } else {
                        const unCheckedList = checkedList.filter((value) => !newList.includes(value));
                        setCheckedList(unCheckedList);
                    }
                }

                return (
                    <div className='user-position-table-thead'>
                        <Checkbox.Group>
                            <Checkbox onChange={handleSelectAllColumnOnChange} />
                        </Checkbox.Group>
                        <span className='select-all-title'>
                            <TranslationText id={`roles.${type}`} />
                        </span>
                    </div>
                );
            },
            key: type,
            dataIndex: type,
            render: (value, record) => {
                if (value && handleIsEditableRoles(value)) {
                    return <Checkbox defaultChecked={!!record[type]} value={value} />;
                }
                return '';
            },
        };
    });

    columns.unshift({
        title: 'title',
        key: 'title',
        dataIndex: 'title',
        render: (text) => <TranslationText id={`roles.${text}`} />,
    });

    columns.push({
        title: <TranslationText id='label.check_all' />,
        key: 'checkAll',
        dataIndex: 'checkAll',
        render: (boolean, record) => {
            function handleSelectAllRowOnChange(e) {
                const filteredRecord = _.omit(record, 'title');
                const list = _.map(filteredRecord, (name) => {
                    return name;
                });
                const newList = list.filter((item) => handleIsEditableRoles(item));
                if (e.target.checked) {
                    setCheckedList((prev) => [...prev, ...newList]);
                } else {
                    const unCheckedList = checkedList.filter((value) => !newList.includes(value));
                    setCheckedList(unCheckedList);
                }
            }
            return (
                <Checkbox.Group>
                    <Checkbox onChange={handleSelectAllRowOnChange} />
                </Checkbox.Group>
            );
        },
    });
    useEffect(() => {
        if (formControl) {
            formControl.setFieldsValue({roles: checkedList});
        }
        // eslint-disable-next-line
    }, [checkedList]);

    useEffect(() => {
        if (data.roles) {
            setCheckedList(data.roles);
        }
        if (data.id) {
            setIsEdit(true);
        }
    }, [data]);

    useEffect(() => {
        return function cleanup() {
            setCheckedList([]);
            setIsEdit(false);
        };
    }, []);

    return (
        <Table
            dataSource={omitEmpty(positions)}
            columns={columns}
            selections={false}
            rowKey='title'
            pagination={false}
        />
    );
};
export default UserPositionTable;
