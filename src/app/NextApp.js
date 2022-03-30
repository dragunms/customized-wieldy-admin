import 'assets/vendors/style';
import 'src/styles/wieldy.less';
import 'assets/css/JoditV1/jodit.min.css';

import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import App from 'src/app';

import {configureStore} from 'src/redux/store';

import history from 'src/redux/history';

const store = configureStore();

const NextApp = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

export default NextApp;
