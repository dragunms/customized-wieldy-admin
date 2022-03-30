import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import NextApp from './app/NextApp';
import registerServiceWorker from './registerServiceWorker';

const render = (Component) => {
    ReactDOM.render(
        // Wrap App inside AppContainer
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

// Do this once
registerServiceWorker();

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app/NextApp', () => {
        render(NextApp);
    });
}
