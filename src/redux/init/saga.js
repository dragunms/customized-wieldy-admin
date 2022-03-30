import {all, put, fork, takeLatest} from 'redux-saga/effects';

import {
    INIT_SUCCESS,
    SERVER_RENDERED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    GET_INIT_USER_POSITION,
    GET_INIT_USER_POSITION_SUCCESS,
} from 'src/constants/actionTypes';
import {CACHE_IS_LOGIN} from 'src/constants/cacheKeys';
import UserPositionServiceAPI from 'src/apis/UserPositionServiceAPI';


import {getCacheLocalStorage} from 'src/utilities/util';

import {loadDataAPI} from 'src/redux/util';

function* watchServerRendered() {
    yield takeLatest(SERVER_RENDERED, function* () {
        const isLogin = getCacheLocalStorage(CACHE_IS_LOGIN);
        if (isLogin) {
            yield put({
                type: LOGIN_SUCCESS,
            });
        } else {
            yield put({
                type: LOGOUT_SUCCESS,
            });
        }
        yield put({
            type: GET_INIT_USER_POSITION,
            ignore_error: true,
        });

        yield put({
            type: INIT_SUCCESS,
        });
    });
}


function* watchGetInitUserPosition() {
    yield takeLatest(GET_INIT_USER_POSITION, function* (action) {
        const res = yield loadDataAPI(action, UserPositionServiceAPI.getList);
        if (res.success) {
            yield put({
                type: GET_INIT_USER_POSITION_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(watchServerRendered),
        fork(watchGetInitUserPosition),
    ]);
}
