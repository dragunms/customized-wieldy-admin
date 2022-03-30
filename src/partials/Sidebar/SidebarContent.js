import './styles.less';

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Menu} from 'antd';
import _ from 'lodash';
import {useIntl} from 'react-intl';

import TranslationText from 'src/components/TranslationText';
import UserProfile from './UserProfile';
import SideBarSubMenu from './SubMenu';
import SearchBox from 'src/components/SearchBox';

import {THEME_TYPE_LITE} from 'src/constants/ThemeSetting';

import config from 'src/configs/sideBar';

import CustomScrollbars from 'src/utilities/CustomScrollbars';

const SidebarContent = () => {
    const {pathname} = useSelector((state) => state.commons);
    const themeType = useSelector((state) => state.themes.themeType);
    const [keyword, setKeyword] = useState('');
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[0];
    const intl = useIntl();

    function handleFilterSideBarOnChange(e) {
        const {value} = e.target;
        setTimeout(function () {
            setKeyword(value);
        }, 500);
    }

    function handleFilteredList(sideBar) {
        return sideBar.list.filter((item) => {
            if (!_.isEmpty(item) && item.title) {
                return intl
                    .formatMessage({id: `${item.title}`})
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
            }
            return {};
        });
    }
    return (
        <>
            <div className='gx-sidebar-content'>
                <div className='gx-sidebar-notifications'>
                    <UserProfile />
                    <ul className='gx-app-nav'>
                        <li>
                            <i className='icon icon-notification' />
                        </li>
                        <li>
                            <i className='icon icon-chat-new' />
                        </li>
                        <li>
                            <i className='icon icon-search-new' />
                        </li>
                    </ul>
                    <SearchBox styleName='sidebar-search' onChange={handleFilterSideBarOnChange} />
                </div>
                <CustomScrollbars className='gx-layout-sider-scrollbar'>
                    <Menu
                        defaultOpenKeys={[defaultOpenKeys]}
                        selectedKeys={[selectedKeys]}
                        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
                        mode='inline'
                    >
                        {config.map((group, index) => {
                            const filterList = handleFilteredList(group);
                            return (
                                <React.Fragment key={index.toString()}>
                                    {group.title !== '' && (
                                        <div className='sidebar-title'>
                                            <TranslationText id={group.title} />
                                        </div>
                                    )}
                                    {_.map(filterList, (category, categoryIndex) => {
                                        return (
                                            <React.Fragment key={categoryIndex.toString()}>
                                                <SideBarSubMenu
                                                    key={category.key}
                                                    roles={category.roles}
                                                    category={category}
                                                    categoryIndex={categoryIndex}
                                                />
                                            </React.Fragment>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

export default SidebarContent;
