import {call, put, select} from 'redux-saga/effects';
import {createIntl} from 'react-intl';

import AppLocale from '../lngProvider';

import {
    IN_PROCESS,
    LOGOUT_SUCCESS,
    PROCESS_COMPLETE,
    PUSH_METADATA,
    PUT_ERROR,
    PUT_WARNING,
} from 'src/constants/actionTypes';
import errorCode from 'src/constants/errorCode';
import {ERROR_PATH} from 'src/constants/subPaths';

import history from 'src/redux/history';

export function* loadDataAPI(action, api, ...params) {
    const locale = yield select((state) => state.themes.locale);
    const currentAppLocale = AppLocale[locale.locale];
    const intl = createIntl(currentAppLocale);
    yield put({
        type: IN_PROCESS,
    });

    const res = yield call(api, ...params);

    if (res.success) {
        yield put({
            type: PROCESS_COMPLETE,
        });
        return res;
    }
    if (res.errors.code === errorCode.ERROR_SERVER) {
        if (!action.ignore_error) {
            yield put({
                type: PUT_WARNING,
                payload: {
                    msg: intl.formatMessage({id: 'message.warning'}),
                    timeout: 30000,
                },
            });
        }
        yield put({
            type: IN_PROCESS,
        });
        yield put(action);
    } else {
        yield put({
            type: PROCESS_COMPLETE,
        });

        if (Array.isArray(res.errors) && res.errors[0].code === errorCode.UNAUTHORIZED) {
            yield put({type: LOGOUT_SUCCESS});
        }
        if (Array.isArray(res.errors)) {
            if (res.errors[0].code === errorCode.NOT_EXISTS || res.errors[0].code === errorCode.NOT_FOUND) {
                history.replace(ERROR_PATH.PATH);
            } else {
                yield put({
                    type: PUT_ERROR,
                    payload: {
                        errors: res.errors,
                        action,
                    },
                });
            }
        }
    }
    return {};
}

export function* changeMeta(item) {
    if (item && item.metadata_title) {
        yield put({
            type: PUSH_METADATA,
            payload: {
                data: {
                    metadata_disable: item.metadata_disable,
                    metadata_title: item.metadata_title,
                    metadata_keywords: item.metadata_keywords,
                    metadata_description: item.metadata_description,
                    metadata_image_url: item.metadata_image_url,
                },
            },
        });
    }
}
