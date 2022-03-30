import _ from 'lodash';
import {message} from 'antd';
import {createIntl} from 'react-intl';
import {all, fork, takeEvery, take, cancel, select} from 'redux-saga/effects';

import AppLocale from 'src/lngProvider';

import {PUT_ERROR, PUT_SUCCESS, PUT_WARNING} from 'src/constants/actionTypes';
import errorCode from 'src/constants/errorCode';

import errorCodeTranslate from 'src/utilities/errorCodeTranslate';

function* watchPutSuccess() {
    const locale = yield select((state) => state.themes.locale);
    if (locale.locale) {
        const currentAppLocale = AppLocale[locale.locale];
        const intl = createIntl(currentAppLocale);
        yield takeEvery(PUT_SUCCESS, (action) => {
            message.success(intl.formatMessage({id: action.payload.msg}), 10);
        });
    }
}

function* watchPutWarning() {
    const locale = yield select((state) => state.themes.locale);
    if (locale.locale) {
        const currentAppLocale = AppLocale[locale.locale];
        const intl = createIntl(currentAppLocale);
        const watcher = yield takeEvery(PUT_WARNING, (action) => {
            message.warning(intl.formatMessage({id: action.payload.msg}), 10);
        });
        yield take(PUT_WARNING);
        yield cancel(watcher);
    }
}

function* watchPutError() {
    const locale = yield select((state) => state.themes.locale);
    if (locale.locale) {
        const currentAppLocale = AppLocale[locale.locale];
        const intl = createIntl(currentAppLocale);
        yield takeEvery(PUT_ERROR, function* (action) {
            let {errors} = action.payload;

            if (!_.isArray(errors)) {
                errors = [errors];
            }

            yield all(
                _.map(errors, (item) => {
                    if (errorCode[item.code] === errorCode.UNKNOWN) {
                        message.error(item.message, 10);
                    } else if (errorCode[item.code]) {
                        message.error(intl.formatMessage({id: errorCodeTranslate[item.code]}), 10);
                    }
                })
            );
        });
    }
}

export default function* rootSaga() {
    yield all([fork(watchPutSuccess), fork(watchPutWarning), fork(watchPutError)]);
}
