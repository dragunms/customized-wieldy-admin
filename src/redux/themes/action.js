import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from 'src/constants/actionTypes';
import {THEME_COLOR, THEME_TYPE} from 'src/constants/ThemeSetting';

export const toggleCollapsedSideNav = (navCollapsed) => {
    return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
};

export const updateWindowWidth = (width) => {
    return {type: WINDOW_WIDTH, payload: {width}};
};

export const setThemeType = (themeType) => {
    return {type: THEME_TYPE, payload: {themeType}};
};

export const setThemeColor = (themeColor) => {
    return {type: THEME_COLOR, payload: {themeColor}};
};

export const switchLanguage = (locale) => {
    return {type: SWITCH_LANGUAGE, payload: locale};
};
