export const HOME_PATH = {
    PATH: '/',
    MATCH: '/',
};

export const NOT_FOUND_PATH = {
    PATH: '/*',
    MATCH: '/*',
};

export const ERROR_PATH = {
    PATH: '/404',
    MATCH: '/404',
};

export const REGISTER_PATH = {
    PATH: '/register',
    MATCH: '/register',
};
export const LOGIN_BY_EMAIL_PATH = {
    PATH: '/login',
    MATCH: '/login',
};

export const FORGOT_PASSWORD_PATH = {
    PATH: '/forgot',
    MATCH: '/forgot',
};

export const CHANGE_PASSWORD_PATH = {
    PATH: '/change-password',
    MATCH: '/change-password',
};

export const MY_PROFILE_PATH = {
    PATH: '/my-profile',
    MATCH: '/my-profile',
};

export const USER_POSITION_PATH = {
    LIST: {
        PATH: '/user-position/list',
        MATCH: '/user-position/list',
    },
    EDIT: {
        PATH: '/user-position/edit',
        MATCH: '/user-position/edit/:id([a-zA-Z0-9]+)',
    },
    ADD: {
        PATH: '/user-position/add',
        MATCH: '/user-position/add',
    },
};

export const USER_PATH = {
    LIST: {
        PATH: '/user/list',
        MATCH: '/user/list',
    },
    EDIT: {
        PATH: '/user/edit',
        MATCH: '/user/edit/:id([a-zA-Z0-9]+)',
    },
    ADD: {
        PATH: '/user/add',
        MATCH: '/user/add',
    },
};
// insert end points end
