import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import init from './init/reducer';
import themes from './themes/reducer';
import commons from './commons/reducer';
import auth from './auth/reducer';
import address from './address/reducer';
import process from './process/reducer';
import userPositions from './userPositions/reducer';
import users from './users/reducer';
// insert import

const reducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        init,
        themes,
        commons,
        auth,
        address,
        process,
        userPositions,
        users,
        // insert reducer
    });
export default reducer;
