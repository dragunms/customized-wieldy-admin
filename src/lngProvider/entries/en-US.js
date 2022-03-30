import antdEn from 'antd/lib/locale-provider/en_US';
import enMessages from 'src/lngProvider/locales/en_US.json';
import {flattenMessages} from 'src/utilities/util';

const EnLang = {
    messages: {
        ...flattenMessages(enMessages),
    },
    antd: antdEn,
    locale: 'en-US',
};
export default EnLang;
