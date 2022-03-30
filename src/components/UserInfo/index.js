import React from 'react';
import {Avatar, Popover} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import TranslationText from 'src/components/TranslationText';

import {MY_PROFILE_PATH} from 'src/constants/subPaths';

import {formatUrlImage} from 'src/utilities/util';

import {logout} from 'src/redux/auth/action';

const UserInfo = () => {
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
            <li onClick={handleLogoutOnClick}>
                <TranslationText id='label.logout' />
            </li>
        </ul>
    );

    return (
        <>
            {profile && (
                <Popover
                    overlayClassName='gx-popover-horizantal'
                    placement='bottomRight'
                    content={userMenuOptions}
                    trigger='click'
                >
                    <Avatar src={formatUrlImage(profile.avatar, 300)} className='gx-avatar gx-pointer' alt='' />
                </Popover>
            )}
        </>
    );
};

export default UserInfo;
