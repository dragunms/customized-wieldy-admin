import './styles.less';

import logo from 'assets/images/logo.png';

import React from 'react';
import {Layout, Popover} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import SearchBox from 'src/components/SearchBox';
import UserInfo from 'src/components/UserInfo';
import AppNotification from 'src/components/AppNotification';
import MailNotification from 'src/components/MailNotification';

import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, TAB_SIZE} from 'src/constants/ThemeSetting';

import CustomScrollbars from 'src/utilities/CustomScrollbars';
import languageData from 'src/configs/languageData';
import Auxiliary from 'src/utilities/Auxiliary';

import {switchLanguage, toggleCollapsedSideNav} from 'src/redux/themes/action';

const {Header} = Layout;

const Topbar = () => {
    const {locale, navStyle} = useSelector((state) => state.themes);
    const {navCollapsed, width} = useSelector((state) => state.commons);
    const dispatch = useDispatch();

    const languageMenu = () => (
        <CustomScrollbars className='gx-popover-lang-scroll'>
            <ul className='gx-sub-popover'>
                {languageData.map((language) => (
                    <li
                        className='gx-media gx-pointer'
                        key={JSON.stringify(language)}
                        onClick={() => dispatch(switchLanguage(language))}
                    >
                        <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
                        <span className='gx-language-text'>{language.name}</span>
                    </li>
                ))}
            </ul>
        </CustomScrollbars>
    );
    return (
        <Header>
            {navStyle === NAV_STYLE_DRAWER || (navStyle === NAV_STYLE_FIXED && width < TAB_SIZE) ? (
                <div className='gx-linebar gx-mr-3'>
                    <i
                        className='gx-icon-btn icon icon-menu'
                        onClick={() => {
                            dispatch(toggleCollapsedSideNav(!navCollapsed));
                        }}
                    />
                </div>
            ) : null}
            <Link to='/' className='gx-d-block gx-d-lg-none gx-pointer'>
                <img alt='' src={logo} className='topbar-logo' />
            </Link>

            <ul className='gx-header-notifications gx-ml-auto'>
                <li className='gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none'>
                    <Popover
                        overlayClassName='gx-popover-horizantal'
                        placement='bottomRight'
                        content={<SearchBox styleName='gx-popover-search-bar' placeholder='Search in app...' />}
                        trigger='click'
                    >
                        <span className='gx-pointer gx-d-block'>
                            <i className='icon icon-search-new' />
                        </span>
                    </Popover>
                </li>
                {width >= TAB_SIZE ? null : (
                    <Auxiliary>
                        <li className='gx-notify'>
                            <Popover
                                overlayClassName='gx-popover-horizantal'
                                placement='bottomRight'
                                content={<AppNotification />}
                                trigger='click'
                            >
                                <span className='gx-pointer gx-d-block'>
                                    <i className='icon icon-notification' />
                                </span>
                            </Popover>
                        </li>

                        <li className='gx-msg'>
                            <Popover
                                overlayClassName='gx-popover-horizantal'
                                placement='bottomRight'
                                content={<MailNotification />}
                                trigger='click'
                            >
                                <span className='gx-pointer gx-status-pos gx-d-block'>
                                    <i className='icon icon-chat-new' />
                                    <span className='gx-status gx-status-rtl gx-small gx-orange' />
                                </span>
                            </Popover>
                        </li>
                    </Auxiliary>
                )}
                <li className='gx-language'>
                    <Popover
                        overlayClassName='gx-popover-horizantal'
                        placement='bottomRight'
                        content={languageMenu()}
                        trigger='click'
                    >
                        <span className='gx-pointer gx-flex-row gx-align-items-center'>
                            <i className={`flag flag-24 flag-${locale.icon}`} />
                            <span className='gx-pl-2 gx-language-name'>{locale.name}</span>
                            <i className='icon icon-chevron-down gx-pl-2' />
                        </span>
                    </Popover>
                </li>
                {width >= TAB_SIZE ? null : (
                    <Auxiliary>
                        <li className='gx-user-nav'>
                            <UserInfo />
                        </li>
                    </Auxiliary>
                )}
            </ul>
        </Header>
    );
};

export default withRouter(Topbar);
