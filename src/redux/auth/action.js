export const LOGOUT = 'LOGOUT';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SEND_RESET_PASSWORD = 'SEND_RESET_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';

export const GET_MY_POSITION = 'GET_MY_POSITION';
export const GET_MY_POSITION_SUCCESS = 'GET_MY_POSITION_SUCCESS';

export const logout = () => {
    return {
        type: LOGOUT_USER,
    };
};
export const login = (email, password) => {
    return {
        type: LOGIN_USER,
        payload: {
            email,
            password,
        },
    };
};

export const sendResetPassword = (email) => {
    return {
        type: SEND_RESET_PASSWORD,
        payload: {
            email,
        },
    };
};

// eslint-disable-next-line camelcase
export const changePassword = (password, new_password) => {
    return {
        type: CHANGE_PASSWORD,
        payload: {
            password,
            new_password,
        },
    };
};
