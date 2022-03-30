import React from 'react';
import {
    RiAdminLine,
    RiPlayListAddFill,
} from 'react-icons/ri';
import {IoAddCircleOutline} from 'react-icons/io5';
import {GoDashboard} from 'react-icons/go';
import {HiOutlineUser} from 'react-icons/hi';

import {
    HOME_PATH,
    USER_POSITION_PATH,
    USER_PATH,
    // insert import
} from 'src/constants/subPaths';

import {
    USER_POSITION_ROLE,
    USER_ROLE,
    // insert role
} from '../constants/roles';

const config = [
    {
        title: '',
        key: '',
        list: [
            {
                title: 'sidebar.dashboard',
                path: HOME_PATH.PATH,
                key: '',
                icon: <GoDashboard />,
                roles: [],
            },
            // insert end points end
        ],
    },
    {
        title: 'sidebar.user',
        key: 'sidebar.user',
        list: [
            {
                title: 'sidebar.user_position',
                icon: <RiAdminLine />,
                key: 'user-position',
                roles: [USER_POSITION_ROLE.READ],
                list: [
                    {
                        title: 'sidebar.list',
                        path: USER_POSITION_PATH.LIST.PATH,
                        icon: <RiPlayListAddFill />,
                        roles: [USER_POSITION_ROLE.READ],
                    },
                    {
                        title: 'sidebar.add',
                        path: USER_POSITION_PATH.ADD.PATH,
                        icon: <IoAddCircleOutline />,
                        roles: [USER_POSITION_ROLE.CREATE],
                    },
                ],
            },
            {
                title: 'sidebar.user',
                icon: <HiOutlineUser />,
                key: 'user',
                roles: [USER_ROLE.READ],
                list: [
                    {
                        title: 'sidebar.list',
                        path: USER_PATH.LIST.PATH,
                        icon: <RiPlayListAddFill />,
                        roles: [USER_ROLE.READ],
                    },
                    {
                        title: 'sidebar.add',
                        path: USER_PATH.ADD.PATH,
                        icon: <IoAddCircleOutline />,
                        roles: [USER_ROLE.CREATE],
                    },
                ],
            },
        ]
    }
];
export default config;
