import {all} from 'redux-saga/effects';

import init from './init/saga';
import themes from './themes/saga';
import commons from './commons/saga';
import messages from './messages/saga';
import auth from './auth/saga';
import address from './address/saga';
import userPositions from './userPositions/saga';
import users from './users/saga';
// insert import


export default function* rootSaga() {
    yield all([
        init(),
        themes(),
        commons(),
        messages(),
        auth(),
        address(),
        userPositions(),
        users(),
        // insert saga
    ]);
}
