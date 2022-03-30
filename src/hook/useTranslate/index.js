import {createIntl} from 'react-intl';

import AppLocale from 'src/lngProvider';
import {useSelector} from 'react-redux';

export const useTranslate = (message) => {
    const locale = useSelector((state) => state.themes.locale);
    const currentAppLocale = AppLocale[locale.locale];
    const intl = createIntl(currentAppLocale);

    function translateMessage() {
        return intl.formatMessage({id: message});
    }

    return {
        translateMessage,
    };
};
