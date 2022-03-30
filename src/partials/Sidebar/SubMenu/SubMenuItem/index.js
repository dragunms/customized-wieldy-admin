import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import withUser from 'src/HOC/withUser';

import TranslationText from 'src/components/TranslationText';

const SubmenuItem = ({item, ...props}) => {
    const prop = _.omit(props, 'checkRole', 'user', 'roles');
    return (
        <NavLink to={item.path}>
            <Menu.Item key={item.path} {...prop}>
                <span>
                    <i className='icon sidebar-icon'>{item.icon}</i>
                    <TranslationText id={item.title} />
                </span>
            </Menu.Item>
        </NavLink>
    );
};
export default withUser([], false)(SubmenuItem);
