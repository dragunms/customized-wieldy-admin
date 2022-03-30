import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const RestrictedRoute = (props) => {
    const {isLogin, auth, noAuth} = props;

    if (isLogin !== undefined) {
        if (auth && !isLogin) {
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            );
        }

        if (noAuth && isLogin) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                    }}
                />
            );
        }

        return <Route {...props} />;
    }
    return null;
};

export default RestrictedRoute;
