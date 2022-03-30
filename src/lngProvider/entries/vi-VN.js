import antdVi from 'antd/lib/locale-provider/vi_VN';
import viMessages from 'src/lngProvider/locales/vi_VN.json';
import {flattenMessages} from 'src/utilities/util';

const ViLang = {
    messages: {
        ...flattenMessages(viMessages),
    },
    antd: antdVi,
    locale: 'vi-VN',
};
export default ViLang;
