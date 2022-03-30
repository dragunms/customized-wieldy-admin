import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';

import AppLocale from 'src/lngProvider';

import {getLayoutRoutes} from 'src/routes/config';

import {detectServerRendered} from 'src/redux/init/action';

const App = () => {
    const locale = useSelector((state) => state.themes.locale);
    const currentAppLocale = AppLocale[locale.locale];
    const themeColor = useSelector((state) => state.themes.themeColor);
    const dispatch = useDispatch();

    useEffect(() => {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = `/css/${themeColor}.css`;

        link.className = 'gx-style';
        document.body.appendChild(link);
    });
    useEffect(() => {
        dispatch(detectServerRendered());
        // eslint-disable-next-line
    }, []);

    return (
        <ConfigProvider locale={currentAppLocale.antd}>
            <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
                <Switch>
                    {getLayoutRoutes().map((props, index) => {
                        return <Route {...props} key={index.toString()} />;
                    })}
                </Switch>
            </IntlProvider>
        </ConfigProvider>
    );
};

export default App;
