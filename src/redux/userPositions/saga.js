import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {
    CREATE_ONE_USER_POSITION,
    DELETE_USER_POSITION,
    GET_ONE_USER_POSITION,
    GET_PAGING_USER_POSITION,
    PUSH_ITEM_USER_POSITION,
    PUSH_PAGING_USER_POSITION,
    RELOAD_USER_POSITION,
    UPDATE_ONE_USER_POSITION,
} from 'src/redux/userPositions/action';
import {PUT_SUCCESS} from 'src/constants/actionTypes';

import {loadDataAPI} from 'src/redux/util';

import UserPositionServiceAPI from 'src/apis/UserPositionServiceAPI';

function* watchGetPagingUserPosition() {
    yield takeLatest(GET_PAGING_USER_POSITION, function* (action) {
        const res = yield loadDataAPI(action, UserPositionServiceAPI.getPaging, action.payload.options);
        if (res.success) {
            yield put({
                type: PUSH_PAGING_USER_POSITION,
                payload: {
                    data: res.data,
                    filter: res.options,
                },
            });
        }
    });
}

function* watchDeleteUserPosition() {
    yield takeLatest(DELETE_USER_POSITION, function* (action) {
        const res = yield loadDataAPI(action, UserPositionServiceAPI.delete, action.payload.id);
        if (res.success) {
            yield put({
                type: RELOAD_USER_POSITION,
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

function* watchGetOneUserPosition() {
    yield takeLatest(GET_ONE_USER_POSITION, function* (action) {
        const item = yield select((state) => state.userPositions.item);
        if (!item.id) {
            const res = yield loadDataAPI(action, UserPositionServiceAPI.getOne, action.payload.id);
            if (res.success) {
                yield put({
                    type: PUSH_ITEM_USER_POSITION,
                    payload: {
                        data: res.data,
                    },
                });
            }
        }
    });
}

function* watchCreateOneUserPosition() {
    yield takeLatest(CREATE_ONE_USER_POSITION, function* (action) {
        const res = yield loadDataAPI(action, UserPositionServiceAPI.createOne, action.payload.data);
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

function* watchUpdateOneUserPosition() {
    yield takeLatest(UPDATE_ONE_USER_POSITION, function* (action) {
        const res = yield loadDataAPI(action, UserPositionServiceAPI.updateOne, action.payload.id, action.payload.data);
        if (res.success) {
            yield put({
                type: PUT_SUCCESS,
                payload: {
                    msg: 'message.update_success',
                },
            });
            yield put({
                type: PUSH_ITEM_USER_POSITION,
                payload: {
                    data: res.data,
                },
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(watchGetPagingUserPosition),
        fork(watchDeleteUserPosition),
        fork(watchGetOneUserPosition),
        fork(watchCreateOneUserPosition),
        fork(watchUpdateOneUserPosition),
    ]);
}
