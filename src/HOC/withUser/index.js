import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import NotFoundPage from 'src/pages/NotFoundPage';

const withUser = (roles = null, showError = true) => (WrapperComponent) => {
    return (props) => {
        const user = useSelector((state) => state.auth.user);

        // eslint-disable-next-line react/destructuring-assignment
        const [rolesToCheck, setRolesToCheck] = useState([...(roles || []), ...(props.roles ? props.roles : [])]);

        // eslint-disable-next-line no-shadow
        function checkRole(rolesToCheck) {
            if (user.position && rolesToCheck) {
                if (!_.isEmpty(rolesToCheck)) {
                    return user.position.roles.some((r) => rolesToCheck.includes(r));
                }
                return true;
            }
            return false;
        }

        useEffect(() => {
            return function cleanup() {
                setRolesToCheck([]);
            };
        }, []);

        let component = <></>;
        if (user.profile && user.position) {
            if (checkRole(rolesToCheck)) {
                component = <WrapperComponent {...props} user={user} checkRole={checkRole} />;
            } else if (showError) {
                component = <NotFoundPage />;
            }
        }
        return <>{component}</>;
    };
};

export default withUser;
