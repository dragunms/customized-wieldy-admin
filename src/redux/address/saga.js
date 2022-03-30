import provinces from 'assets/jsons/provinces.json';
import districts from 'assets/jsons/districts.json';

import _ from 'lodash';
import {all, put, takeLatest} from 'redux-saga/effects';

import {INIT_ADDRESS, INIT_ADDRESS_SUCCESS} from 'src/constants/actionTypes';

function* watchInitAddress() {
    yield takeLatest(INIT_ADDRESS, function* () {
        yield put({
            type: INIT_ADDRESS_SUCCESS,
            payload: {
                provinces,
                districts,
                provinceObject: _.keyBy(provinces, 'id'),
                districtObject: _.keyBy(districts, 'id'),
            },
        });
    });
}

export default function* rootSaga() {
    yield all([watchInitAddress()]);
}
