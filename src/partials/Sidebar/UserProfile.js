import './styles.less';

import React from 'react';
import {Avatar, Popover} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import TranslationText from 'src/components/TranslationText';

import {CHANGE_PASSWORD_PATH, MY_PROFILE_PATH} from 'src/constants/subPaths';

import {formatUrlImage} from 'src/utilities/util';

import {logout} from 'src/redux/auth/action';

const UserProfile = () => {
    const profile = useSelector((state) => state.auth.user.profile);
    const dispatch = useDispatch();

    function handleLogoutOnClick() {
        dispatch(logout());
    }

    const userMenuOptions = (
        <ul className='gx-user-popover'>
            <li>
                <Link to={MY_PROFILE_PATH.PATH}>
                    <TranslationText id='label.account' />
                </Link>
            </li>
            <li>
                <Link to={CHANGE_PASSWORD_PATH.PATH}>
                    <TranslationText id='label.change_password' />
                </Link>
            </li>
            <li onClick={handleLogoutOnClick}>
                <span className='gx-link'>
                    <TranslationText id='label.logout' />
                </span>
            </li>
        </ul>
    );
    return (
        <div className='gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row side-bar'>
            <Popover placement='bottomRight' content={userMenuOptions} trigger='click'>
                {profile && (
                    <div className='gx-sidebar-user-info'>
                        <Avatar
                            src={formatUrlImage(profile.avatar, 300)}
                            className='gx-size-40 gx-pointer gx-mr-3 gx-sidebar-avatar'
                            alt=''
                        />
                        <span className='gx-avatar-name'>{profile.name}</span>
                    </div>
                )}
            </Popover>
        </div>
    );
};

export default UserProfile;
