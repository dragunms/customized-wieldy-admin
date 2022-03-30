import _ from 'lodash';
import React from 'react';

import {
    HOME_PATH,
    MY_PROFILE_PATH,
    LOGIN_BY_EMAIL_PATH,
    FORGOT_PASSWORD_PATH,
    USER_POSITION_PATH,
    CHANGE_PASSWORD_PATH,
    USER_PATH,
    // insert import
} from 'src/constants/subPaths';

import CircularProgress from 'src/components/CircularProgress';

import LoginPage from '../pages/Auth/LoginPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ChangePasswordPage from '../pages/Auth/ChangePassWordPage';
import NotFoundPage from '../pages/NotFoundPage';

function asyncComponent(importComponent, Loading = CircularProgress) {
    const ChildLazy = React.lazy(importComponent);
    return (props) => (
        <React.Suspense fallback={<Loading />}>
            <ChildLazy {...props} />
        </React.Suspense>
    );
}

export const LAYOUT_KEY = {
    MAIN: 'MAIN',
    EMPTY: 'EMPTY',
    AUTH: 'AUTH',
};

const config = [
    {
        layout: asyncComponent(() => import('src/layouts/MainLayout')),
        layoutKey: LAYOUT_KEY.MAIN,
        pages: [
            {
                auth: true,
                path: HOME_PATH.MATCH,
                page: asyncComponent(() => import('src/pages/HomePage')),
            },
            {
                auth: true,
                path: USER_POSITION_PATH.LIST.MATCH,
                page: asyncComponent(() => import('src/pages/UserPositionPage/ListPage')),
            },
            {
                auth: true,
                path: USER_POSITION_PATH.EDIT.MATCH,
                page: asyncComponent(() => import('src/pages/UserPositionPage/EditPage')),
            },
            {
                auth: true,
                path: USER_POSITION_PATH.ADD.MATCH,
                page: asyncComponent(() => import('src/pages/UserPositionPage/EditPage')),
            },
            {
                auth: true,
                path: MY_PROFILE_PATH.MATCH,
                page: asyncComponent(() => import('src/pages/ProfilePage')),
            },
            {
                auth: true,
                path: USER_PATH.LIST.MATCH,
                page: asyncComponent(() => import('src/pages/UserPage/ListPage')),
            },
            {
                auth: true,
                path: USER_PATH.EDIT.MATCH,
                page: asyncComponent(() => import('src/pages/UserPage/EditPage')),
            },
            {
                auth: true,
                path: USER_PATH.ADD.MATCH,
                page: asyncComponent(() => import('src/pages/UserPage/EditPage')),
            },
            // insert end points end
        ],
    },
    {
        layout: asyncComponent(() => import('src/layouts/AuthLayout')),
        layoutKey: LAYOUT_KEY.AUTH,
        pages: [
            {
                noAuth: true,
                path: LOGIN_BY_EMAIL_PATH.MATCH,
                exact: true,
                page: LoginPage,
            },
            {
                noAuth: true,
                path: FORGOT_PASSWORD_PATH.MATCH,
                exact: true,
                page: ForgotPasswordPage,
            },
            {
                Auth: true,
                path: CHANGE_PASSWORD_PATH.MATCH,
                exact: true,
                page: ChangePasswordPage,
            },
        ],
    },
    {
        layout: asyncComponent(() => import('src/layouts/EmptyLayout')),
        layoutKey: LAYOUT_KEY.EMPTY,
        pages: [
            {
                path: '/*',
                page: NotFoundPage,
            },
        ],
    },
];

export const getPageRoutes = (layoutKey) => {
    const pageRoutes = [];

    config.map((route) => {
        if (route.layoutKey === layoutKey) {
            route.pages.map((item) => {
                pageRoutes.push(item);
                return true;
            });
        }
        return true;
    });
    return pageRoutes;
};

export const getLayoutRoutes = () =>
    config.map((route, key) => {
        const paths = route.pages.map((item) => {
            return _.isUndefined(item.path) ? '/.*' : item.path;
        });

        return {
            key,
            path: paths.length === 0 ? '*' : paths,
            exact: true,
            component: route.layout,
        };
    });
