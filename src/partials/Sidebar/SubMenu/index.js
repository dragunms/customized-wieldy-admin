import './styles.less';

import _ from 'lodash';
import {Divider, Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import React from 'react';

import withUser from 'src/HOC/withUser';

import TranslationText from 'src/components/TranslationText';
import SubmenuItem from './SubMenuItem';

const {SubMenu} = Menu;

const SideBarSubMenu = ({category, categoryIndex, ...props}) => {
    const prop = _.omit(props, 'checkRole', 'user', 'roles');
    if (_.isEmpty(category)) {
        return <Divider style={{borderTop: '1px solid rgba(255, 255, 255, 0.5)'}} className='divider-test' />;
    }
    if (category.list) {
        return (
            <SubMenu
                key={category.key}
                title={
                    <span>
                        <i className='icon sidebar-icon'>{category.icon}</i>
                        <span>
                            <TranslationText id={category.title} />
                        </span>
                    </span>
                }
                {...prop}
            >
                <>
                    {_.map(category.list, (item) => {
                        const key = item.path.substr(1);
                        return <SubmenuItem item={item} roles={item.roles} key={key} />;
                    })}
                </>
            </SubMenu>
        );
    }
    return (
        <NavLink to={category.path}>
            <Menu.Item key={category.key} {...prop}>
                <span>
                    <i className='icon sidebar-icon'>{category.icon}</i>
                    <TranslationText id={category.title} />
                </span>
            </Menu.Item>
        </NavLink>
    );
};

export default withUser([], false)(SideBarSubMenu);
