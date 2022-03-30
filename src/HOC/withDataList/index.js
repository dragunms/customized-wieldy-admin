import './styles.less';

import {FcInfo} from 'react-icons/fc';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Dropdown, Menu, message, Modal, Table, Tooltip} from 'antd';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import querystring from 'querystring';
import {Link, useLocation} from 'react-router-dom';

import withUser from '../withUser';

import TranslationText from 'src/components/TranslationText';
import WarningAlerts from 'src/components/Alert/Warning';
import FilterData from 'src/partials/FilterData';
import Pagination from 'src/components/Pagination';
import TableColumnsList from './TableColumnsList';
import CircularProgress from 'src/components/CircularProgress';
import DetailModal from 'src/partials/DetailModal';

import {convertRelativeTime} from 'src/utilities/util';

const withDataList = (reducer, roles, actions, columns, title, customSearch, category, status, ignore) => (
    WrapperComponent
) => {
    const HookDataList = ({checkRole}) => {
        const location = useLocation();
        const ref = useRef(null);
        const loading = useSelector((state) => state.process.inProcess);

        const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
        const [isRestoreAlertOpen, setIsRestoreAlertOpen] = useState(false);
        const [viewDetail, setViewDetail] = useState(false);
        const [viewHTML, setViewHTML] = useState(false);
        const [responseHTML, setResponseHTML] = useState(null);
        const [selectItem, setSelectItem] = useState(false);
        const categories = useSelector((state) => state.init.data[category]);

        const dispatch = useDispatch();
        const reducers = {
            list: useSelector((state) => state[reducer]),
            data: useSelector((state) => state.init.data),
        };
        const {data} = reducers.list;
        const filterOptions = reducers.list.filter;
        const {reload} = reducers.list;
        const columnsList = TableColumnsList(columns, categories, status, filterOptions);

        function handleOpenDeleteAlertOnClick(item) {
            setIsDeleteAlertOpen(true);
            setSelectItem(item);
        }
        function handleCloseDeleteAlertOnCancel() {
            setIsDeleteAlertOpen(false);
        }

        function handleDeleteOnConfirm() {
            setIsDeleteAlertOpen(false);
            if (selectItem.id) {
                dispatch(actions.delete(selectItem.id));
            }
        }

        function handleOpenRestoreAlertOnClick(item) {
            setIsRestoreAlertOpen(true);
            setSelectItem(item);
        }
        function handleCloseRestoreAlertOnCancel() {
            setIsRestoreAlertOpen(false);
        }

        function handleRestoreOnConfirm() {
            setIsRestoreAlertOpen(false);
            if (selectItem.id) {
                dispatch(actions.delete(selectItem.id));
            }
        }

        function handleViewDetailOnClick(item) {
            setViewDetail(true);
            setSelectItem(item);
        }

        function handleCheckCookieOnClick(item) {
            setResponseHTML(null);
            if (item) {
                setViewHTML(true);
                actions
                    .check(item)
                    .then((res) => {
                        if (res.success) {
                            setResponseHTML(res.data);
                        }
                    })
                    .catch((err) => message.error(err));
            }
        }
        function handleCheckPuppeteerOnClick(item) {
            setResponseHTML(null);
            if (item) {
                setViewHTML(true);
                actions
                    .puppeteer(item)
                    .then((res) => {
                        if (res.success) {
                            setResponseHTML(res.data);
                        }
                    })
                    .catch((err) => message.error(err));
            }
        }

        function handleCloseViewDetailOnClick() {
            setViewDetail(false);
        }

        function handleCloseViewHTMLOnClick() {
            setViewHTML(false);
        }

        // const rowSelection = {
        //     onChange: (selectedRowKeys) => {
        //         setSelectItem(selectedRowKeys);
        //     },
        // };

        /* eslint-disable */
        useEffect(() => {
            const options = querystring.decode(location.search.replace('?', ''));
            dispatch(actions.list(options));

            if (ref?.current) {
                ref.current.scrollIntoView({behavior: 'smooth'});
            }
        }, [location, reload]);

        useEffect(() => {
            return function cleanup() {
                dispatch(actions.clear());
            };
            // eslint-disable-next-line
        }, []);

        /* eslint-enable */
        columnsList.push({
            title: <TranslationText id='label.action' />,
            dataIndex: 'action',
            key: 'action',
            className: 'ant-table-cell-action',
            render: (action, context) => {
                return (
                    <>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    {checkRole(roles.view) && (
                                        <Menu.Item key='detail' onClick={() => handleViewDetailOnClick(context)}>
                                            <span>
                                                <TranslationText id='label.view_detail' />
                                            </span>
                                        </Menu.Item>
                                    )}
                                    {checkRole(roles.update) && (
                                        <Menu.Item key='edit'>
                                            {/* eslint-disable-next-line react/destructuring-assignment */}
                                            <Link to={`edit/${context.id}`}>
                                                <TranslationText id='label.edit' />
                                            </Link>
                                        </Menu.Item>
                                    )}
                                    {checkRole(roles.delete) && (
                                        <Menu.Item key='delete' onClick={() => handleOpenDeleteAlertOnClick(context)}>
                                            <span>
                                                <TranslationText id='label.delete' />
                                            </span>
                                        </Menu.Item>
                                    )}
                                    {checkRole(roles.restore) && (
                                        <Menu.Item key='restore' onClick={() => handleOpenRestoreAlertOnClick(context)}>
                                            <span>
                                                <TranslationText id='label.restore' />
                                            </span>
                                        </Menu.Item>
                                    )}
                                    {checkRole(roles.view) && actions.check && (
                                        <Menu.Item
                                            key='check_cookie'
                                            onClick={() => handleCheckCookieOnClick(context?.id)}
                                        >
                                            <span>
                                                <TranslationText id='label.check' /> <TranslationText id={title} />
                                            </span>
                                        </Menu.Item>
                                    )}
                                    {checkRole(roles.view) && actions.puppeteer && (
                                        <Menu.Item
                                            key='check_puppeteer'
                                            onClick={() => handleCheckPuppeteerOnClick(context?.id)}
                                        >
                                            <span>
                                                <TranslationText id='label.check_puppeteer' />
                                            </span>
                                        </Menu.Item>
                                    )}
                                </Menu>
                            }
                            getPopupContainer={(trigger) => trigger.parentNode}
                        >
                            <div className='gx-d-inline-flex'>
                                <Button>
                                    <TranslationText id='label.action' /> <DownOutlined className='gx-fs-xs' />
                                </Button>
                            </div>
                        </Dropdown>
                        <Tooltip
                            title={() => {
                                return (
                                    <div className='listContentItem'>
                                        <div>
                                            <span className='label'>
                                                <TranslationText id='label.created_at' />:
                                            </span>
                                            <span className='content'> {convertRelativeTime(context.created_at)}</span>
                                        </div>
                                        <div>
                                            <span className='label'>
                                                <TranslationText id='label.modified_at' />:
                                            </span>
                                            <span className='content'> {convertRelativeTime(context.modified_at)}</span>
                                        </div>
                                    </div>
                                );
                            }}
                            className='date-list-tooltip'
                        >
                            <FcInfo size={18} />
                        </Tooltip>
                    </>
                );
            },
        });

        return (
            <>
                {data ? (
                    <div className='standard-list' ref={ref}>
                        <FilterData {...filterOptions} customSearch={customSearch} reducers={reducers} />
                        <WrapperComponent />
                        <Card title={<TranslationText id={title} />}>
                            {checkRole(roles.create) && (
                                <Link to='add'>
                                    <Button className='btn-add'>
                                        <PlusOutlined />
                                    </Button>
                                </Link>
                            )}
                            {loading ? (
                                <CircularProgress className='relative' />
                            ) : (
                                <Table
                                    className='gx-table-responsive '
                                    columns={columnsList}
                                    rowKey='id'
                                    dataSource={data.docs}
                                    pagination={false}
                                />
                            )}
                        </Card>
                        <Pagination page={data.page} limit={data.limit} totalPages={data.totalDocs} />
                        {isDeleteAlertOpen && (
                            <WarningAlerts
                                onCancel={handleCloseDeleteAlertOnCancel}
                                onConfirm={handleDeleteOnConfirm}
                                title={<TranslationText id='label.delete' />}
                            >
                                <TranslationText id='label.delete_confirm' />
                                <div className='modal-delete-name'>{selectItem.title}</div>
                            </WarningAlerts>
                        )}
                        {isRestoreAlertOpen && (
                            <WarningAlerts
                                onCancel={handleCloseRestoreAlertOnCancel}
                                onConfirm={handleRestoreOnConfirm}
                                title={<TranslationText id='label.restore' />}
                            >
                                <TranslationText id='label.restore_confirm' />
                                <div className='modal-delete-name'>{selectItem.title}</div>
                            </WarningAlerts>
                        )}

                        <Modal
                            footer={null}
                            closable
                            visible={viewDetail}
                            onCancel={handleCloseViewDetailOnClick}
                            width={1200}
                        >
                            <DetailModal data={selectItem} ignore={ignore} />
                        </Modal>
                        <Modal
                            footer={null}
                            closable
                            visible={viewHTML}
                            onCancel={handleCloseViewHTMLOnClick}
                            width={1200}
                            className='ant-html-modal'
                        >
                            {responseHTML ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: responseHTML,
                                    }}
                                />
                            ) : (
                                <CircularProgress className='relative' />
                            )}
                        </Modal>
                    </div>
                ) : (
                    <CircularProgress className='relative' />
                )}
            </>
        );
    };
    return withUser(roles.view)(HookDataList);
};

export default withDataList;
