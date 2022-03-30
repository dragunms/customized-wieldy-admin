import React from 'react';
import {Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import RestrictedRoute from './RestrictedRoute';

import {getPageRoutes} from './config';

const PageRoute = ({layoutKey}) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    return (
        <Switch>
            {getPageRoutes(layoutKey).map((item, key) => {
                const props = {
                    key,
                    isLogin,
                    exact: true,
                    path: item.path,
                    component: item.page,
                    auth: item.auth,
                    noAuth: item.noAuth,
                };

                return <RestrictedRoute {...props} />;
            })}
        </Switch>
    );
};
export default PageRoute;
