import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware];

const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

export function configureStore(preloadedState = {}) {
    const store = createStore(
        reducer(history),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                ...middlewares
            )
        )
    );
    sagaMiddleware.run(saga);

    return store;
}
