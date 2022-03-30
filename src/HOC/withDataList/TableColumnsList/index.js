import './styles.less';

import {ReactComponent as CheckedIcon} from 'assets/images/icons/ic_check.svg';
import {ReactComponent as CloseIcon} from 'assets/images/icons/ic_close.svg';

import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'antd';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {useLocation} from 'react-router-dom';
import querystring from 'querystring';
import history from 'src/redux/history';
import omitEmpty from 'omit-empty';

import TranslationText from 'src/components/TranslationText';
import StatusTag from 'src/components/StatusTag';

import {formatUrlImage} from 'src/utilities/util';

const TableColumnsList = (columns, categoriesReducer, statusList, filterOptions) => {
    const location = useLocation();
    // eslint-disable-next-line
    const [params, setParams] = useState(querystring.decode(location.search.replace('?', '')));
    const [sorted, setSorted] = useState(false);
    const [order, setOrder] = useState({
        sort_by: params.sort_by,
        sort_type: params.sort_by && params.sort_type === 'asc' ? 'asc' : 'desc',
    });

    function handleSortOnClick(col) {
        let sortType = 'desc';
        if (order.sort_type === 'desc') {
            sortType = 'asc';
        }
        setSorted(true);
        setOrder({
            sort_by: col,
            sort_type: sortType,
        });
    }

    function handleShowSorter(col) {
        if (filterOptions) {
            const isSorterCol = filterOptions.sortFields.includes(col);
            if (isSorterCol) {
                let icon = <DownOutlined className={`gx-fs-xs ${params.sort_by && 'active'}`} />;
                if (params.sort_type === 'asc') {
                    icon = <UpOutlined className={`gx-fs-xs ${params.sort_by && 'active'}`} />;
                }
                return (
                    <div onClick={() => handleSortOnClick(col)}>
                        <TranslationText id={`field.${col}`} />
                        &nbsp; {icon}
                    </div>
                );
            }
        }

        return <TranslationText id={`label.${col}`} />;
    }

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            if (order.sort_by && sorted) {
                history.replace(`${location.pathname}?${querystring.encode(omitEmpty(order))}`);
            }
        }
        return () => {
            isMounted = true;
        };
        // eslint-disable-next-line
    }, [order]);

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            setParams(querystring.decode(location.search.replace('?', '')));
        }
        return () => {
            isMounted = true;
        };
    }, [location]);

    return columns.map((item) => {
        if (item.type === 'thumb')
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                className: 'ant-table-cell-center',
                render: (image) => (
                    <Avatar
                        src={formatUrlImage(image, 300)}
                        shape='square'
                        size={{
                            xs: 72,
                            sm: 72,
                            md: 72,
                            lg: 72,
                            xl: 72,
                            xxl: 72,
                        }}
                    />
                ),
            };
        if (item.type === 'category')
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                render: (text) => {
                    if (categoriesReducer && text) {
                        const category = _.find(categoriesReducer, (categories) => categories.id === text);
                        return (
                            <div className='listContentItem'>
                                <div>
                                    <span className='label'>
                                        <TranslationText id={`label.${item.name}`} />:
                                    </span>
                                    <span className='content'>{category[item.value]}</span>
                                </div>
                            </div>
                        );
                    }
                    return '';
                },
            };
        if (item.type === 'status')
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                render: (number) => (
                    <div className='listContentItem'>
                        <span className='label'>
                            <TranslationText id={`label.${item.name}`} />:{' '}
                        </span>
                        <span className='content'>
                            <StatusTag status={number} list={statusList} />
                        </span>
                    </div>
                ),
            };
        if (item.type === 'location')
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                render: (object) => (
                    <div className='listContentItem'>
                        <span className='label'>
                            <TranslationText id={`label.${item.name}`} />:{' '}
                        </span>
                        <span className='content'>
                            {object.lat}, {object.lng}
                        </span>
                    </div>
                ),
            };
        if (item.type === 'object') {
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                render: (text) => (
                    <div className='listContentItem'>
                        <div>
                            <span className='label'>
                                <TranslationText id={`label.${item.name}`} />:
                            </span>
                            <span className='content'>{text[item.value]}</span>
                        </div>
                    </div>
                ),
            };
        }
        if (item.type === 'boolean') {
            return {
                title: handleShowSorter(item.name),
                dataIndex: item.name,
                key: item.name,
                render: (text) => (
                    <div className='listContentItem'>
                        <div>
                            <span className='label'>
                                <TranslationText id={`label.${item.name}`} />:
                            </span>
                            {!!text ? (
                                <span className='content'>
                                    <CheckedIcon className='icon checked' />
                                </span>
                            ) : (
                                <span className='content'>
                                    <CloseIcon className='icon error' />
                                </span>
                            )}
                        </div>
                    </div>
                ),
            };
        }
        return {
            title: handleShowSorter(item.name),
            dataIndex: item.name,
            key: item.name,
            render: (text) => (
                <div className='listContentItem'>
                    <div>
                        <span className='label'>
                            <TranslationText id={`label.${item.name}`} />:
                        </span>
                        <span className='content'>{text}</span>
                    </div>
                </div>
            ),
        };
    });
};
export default TableColumnsList;
