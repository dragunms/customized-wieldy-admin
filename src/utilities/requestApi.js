import _ from 'lodash';

import errorCode from 'src/constants/errorCode';

function requestApi(apiURL, method = 'GET', body = null, headers = {}) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers,
        },
        method,
        timeout: 30,
        credentials: 'include',
    };
    if (body !== null) {
        if (method === 'GET') {
            if (!_.isEmpty(body)) {
                // eslint-disable-next-line no-param-reassign
                apiURL +=
                    (apiURL.includes('?') ? '&' : '?') +
                    Object.keys(body)
                        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
                        .join('&');
            }
        } else {
            options.body = JSON.stringify(body);
        }
    }

    return fetch(apiURL, options)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('error', error);
            return {
                success: false,
                errors: {
                    message: _.isObject(error) ? error.message || error.stack : error,
                    code: errorCode.ERROR_SERVER,
                },
            };
        });
}

export function getData(apiURL, data = null, headers = {}) {
    return requestApi(apiURL, 'GET', data, headers);
}

export function postData(apiURL, data = null, headers = {}) {
    return requestApi(apiURL, 'POST', data, headers);
}

export function putData(apiURL, data = null, headers = {}) {
    return requestApi(apiURL, 'PUT', data, headers);
}

export function deleteData(apiURL, data = null, headers = {}) {
    return requestApi(apiURL, 'DELETE', data, headers);
}
