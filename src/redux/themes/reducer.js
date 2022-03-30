import {SWITCH_LANGUAGE} from 'src/constants/actionTypes';
import {
    LAYOUT_TYPE_FULL,
    NAV_STYLE_FIXED,
    THEME_COLOR,
    THEME_TYPE,
    THEME_TYPE_SEMI_DARK,
} from 'src/constants/ThemeSetting';
import languageData from 'src/configs/languageData';

const INIT_STATE = {
    navStyle: NAV_STYLE_FIXED,
    layoutType: LAYOUT_TYPE_FULL,
    themeType: THEME_TYPE_SEMI_DARK,
    themeColor: 'orange',
    isDirectionRTL: false,
    locale: languageData[0],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case THEME_TYPE:
            return {
                ...state,
                themeType: action.payload.themeType,
            };
        case THEME_COLOR:
            return {
                ...state,
                themeColor: action.payload.themeColor,
            };
        case SWITCH_LANGUAGE:
            return {
                ...state,
                locale: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
