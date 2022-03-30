import {getData, postData} from 'src/utilities/requestApi';
import {
    LOGIN_ENDPOINT,
    LOGOUT_ENDPOINT,
    MY_POSITION_ENDPOINT,
    MY_PROFILE_ENDPOINT,
    SEND_RESET_PASSWORD_ENDPOINT,
    CHANGE_PASSWORD_ENDPOINT,
} from 'src/constants/apiEndpoints';

const AuthServiceAPI = {
    login: (email, password) => {
        return postData(LOGIN_ENDPOINT, {
            email,
            password,
        });
    },

    logout: () => {
        return postData(LOGOUT_ENDPOINT);
    },

    sendEmailResetPassword: (email) => {
        return getData(SEND_RESET_PASSWORD_ENDPOINT, {
            email,
        });
    },

    getMyProfile: () => {
        return getData(MY_PROFILE_ENDPOINT);
    },

    getMyPosition: () => {
        return getData(MY_POSITION_ENDPOINT);
    },

    // eslint-disable-next-line camelcase
    changePassword: (password, new_password) => {
        return postData(CHANGE_PASSWORD_ENDPOINT, {
            password,
            new_password,
        });
    },
};

export default AuthServiceAPI;
