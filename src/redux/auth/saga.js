import {all, put, take, takeLatest, fork} from 'redux-saga/effects';

import {
    CHANGE_PASSWORD,
    GET_MY_POSITION,
    GET_MY_POSITION_SUCCESS,
    GET_MY_PROFILE,
    GET_MY_PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_USER,
    SEND_RESET_PASSWORD,
    LOGIN_USER,
} from './action';

import {PUT_SUCCESS, GET_INIT_DATA} from 'src/constants/actionTypes';
import {LOGIN_BY_EMAIL_PATH} from 'src/constants/subPaths';
import {CACHE_IS_LOGIN} from 'src/constants/cacheKeys';

import AuthServiceAPI from 'src/apis/AuthServiceAPI';

import {getCacheLocalStorage, setCacheLocalStorage} from 'src/utilities/util';

import {loadDataAPI} from 'src/redux/util';

import history from 'src/redux/history';


function* watchLogin() {
    yield takeLatest(LOGIN_USER, function* (action) {
        const res = yield loadDataAPI(action, AuthServiceAPI.login, action.payload.email, action.payload.password);
        if (res.success) {
            yield put({
                type: LOGIN_SUCCESS,
            });
            history.push('/');
        }
    });
}

function* watchLoginSuccess() {
    yield takeLatest(LOGIN_SUCCESS, function* () {
        setCacheLocalStorage(CACHE_IS_LOGIN, true);
        yield put({
            type: GET_MY_PROFILE,
        });
        yield take(GET_MY_PROFILE_SUCCESS);
        yield put({
            type: GET_INIT_DATA,
            ignore_error: true,
        });
        yield put({
            type: GET_MY_POSITION,
        });
    });
}

function* watchLogout() {
    yield takeLatest(LOGOUT_USER, function* (action) {
        const res = yield loadDataAPI(action, AuthServiceAPI.logout);
        if (res.success) {
            yield put({
                type: LOGOUT_SUCCESS,
            });
            history.push(LOGIN_BY_EMAIL_PATH.MATCH);
        }
    });
}

function* watchLogoutSuccess() {
    yield takeLatest(LOGOUT_SUCCESS, function () {
        setCacheLocalStorage(CACHE_IS_LOGIN, false);
    });
}

function* watchSendResetPassword() {
    yield takeLatest(SEND_RESET_PASSWORD, function* (action) {
        const res = yield loadDataAPI(action, AuthServiceAPI.sendEmailResetPassword, action.payload.email);
        if (res.success) {
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.send_reset_password.success',
                },
            });
        }
    });
}

function* watchGetMytProfile() {
    yield takeLatest(GET_MY_PROFILE, function* (action) {
        const res = yield loadDataAPI(action, AuthServiceAPI.getMyProfile);
        if (res.success) {
            yield put({
                type: GET_MY_PROFILE_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        }
    });
}

function* watchGetMyPosition() {
    yield takeLatest(GET_MY_POSITION, function* (action) {
        const res = yield loadDataAPI(action, AuthServiceAPI.getMyPosition);
        if (res.success) {
            yield put({
                type: GET_MY_POSITION_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        }
    });
}

function* watchCheckLogin() {
    if (getCacheLocalStorage(CACHE_IS_LOGIN)) {
        yield put({
            type: LOGIN_SUCCESS,
        });
    } else {
        yield put({
            type: LOGOUT_SUCCESS,
        });
    }
}

function* watchChangePassword() {
    yield takeLatest(CHANGE_PASSWORD, function* (action) {
        const res = yield loadDataAPI(
            action,
            AuthServiceAPI.changePassword,
            action.payload.password,
            action.payload.new_password
        );
        if (res.success) {
            yield put({
                type: LOGOUT_USER,
            });
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.change_password.success',
                },
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(watchCheckLogin),
        fork(watchLogin),
        fork(watchLoginSuccess),
        fork(watchLogout),
        fork(watchLogoutSuccess),
        fork(watchSendResetPassword),
        fork(watchGetMytProfile),
        fork(watchGetMyPosition),
        fork(watchChangePassword),
    ]);
}
