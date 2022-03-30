import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Layout} from 'antd';
import {withRouter} from 'react-router-dom';

import SidebarContent from './SidebarContent';

import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, TAB_SIZE, THEME_TYPE_LITE} from 'src/constants/ThemeSetting';

import {toggleCollapsedSideNav, updateWindowWidth} from 'src/redux/themes/action';

const {Sider} = Layout;

const Sidebar = () => {
    const dispatch = useDispatch();

    const themeType = useSelector((state) => state.themes.themeType);
    const {navCollapsed, width} = useSelector((state) => state.commons);
    const navStyle = useSelector((state) => state.themes.navStyle);
    const onToggleCollapsedNav = () => {
        dispatch(toggleCollapsedSideNav(!navCollapsed));
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(updateWindowWidth(window.innerWidth));
        });
    }, [dispatch]);

    let drawerStyle = 'gx-collapsed-sidebar';

    if (navStyle === NAV_STYLE_FIXED) {
        drawerStyle = '';
    }
    if (navStyle === NAV_STYLE_FIXED && width < TAB_SIZE) {
        drawerStyle = 'gx-collapsed-sidebar';
    }
    return (
        <Sider
            className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
            trigger={null}
            collapsed={width < TAB_SIZE ? false : navStyle === NAV_STYLE_DRAWER}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            collapsible
        >
            {navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ? (
                <Drawer
                    className={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
                    placement='left'
                    closable={false}
                    onClose={onToggleCollapsedNav}
                    visible={navCollapsed}
                >
                    <SidebarContent />
                </Drawer>
            ) : (
                <SidebarContent />
            )}
        </Sider>
    );
};
export default withRouter(Sidebar);
