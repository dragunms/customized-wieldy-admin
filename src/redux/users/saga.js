import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {
    CREATE_ONE_USER,
    DELETE_USER,
    GET_ONE_USER,
    GET_PAGING_USER,
    PUSH_ITEM_USER,
    PUSH_PAGING_USER,
    RELOAD_USER,
    UPDATE_ONE_USER,
} from 'src/redux/users/action';
import {PUT_SUCCESS} from 'src/constants/actionTypes';

import {loadDataAPI} from 'src/redux/util';

import UserServiceAPI from 'src/apis/UserServiceAPI';

function* watchGetPagingUser() {
    yield takeLatest(GET_PAGING_USER, function* (action) {
        const res = yield loadDataAPI(action, UserServiceAPI.getPaging, action.payload.options);
        if (res.success) {
            yield put({
                type: PUSH_PAGING_USER,
                payload: {
                    data: res.data,
                    filter: res.options,
                },
            });
        }
    });
}

function* watchDeleteUser() {
    yield takeLatest(DELETE_USER, function* (action) {
        const res = yield loadDataAPI(action, UserServiceAPI.delete, action.payload.id);
        if (res.success) {
            yield put({
                type: RELOAD_USER,
            });
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.delete_success',
                },
            });
        }
    });
}

function* watchGetOneUser() {
    yield takeLatest(GET_ONE_USER, function* (action) {
        const item = yield select((state) => state.users.item);
        if (!item.id) {
            const res = yield loadDataAPI(action, UserServiceAPI.getOne, action.payload.id);
            if (res.success) {
                yield put({
                    type: PUSH_ITEM_USER,
                    payload: {
                        data: res.data,
                    },
                });
            }
        }
    });
}

function* watchCreateOneUser() {
    yield takeLatest(CREATE_ONE_USER, function* (action) {
        const res = yield loadDataAPI(action, UserServiceAPI.createOne, action.payload.data);
        if (res.success) {
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.create_success',
                },
            });
        }
    });
}

function* watchUpdateOneUser() {
    yield takeLatest(UPDATE_ONE_USER, function* (action) {
        const res = yield loadDataAPI(action, UserServiceAPI.updateOne, action.payload.id, action.payload.data);
        if (res.success) {
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.update_success',
                },
            });
            yield put({
                type: PUSH_ITEM_USER,
                payload: {
                    data: res.data,
                },
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(watchGetPagingUser),
        fork(watchDeleteUser),
        fork(watchGetOneUser),
        fork(watchCreateOneUser),
        fork(watchUpdateOneUser),
    ]);
}
