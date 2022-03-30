import {GET_MY_POSITION_SUCCESS, GET_MY_PROFILE_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS} from './action';

const INIT_STATE = {
    user: {
        profile: null,
        position: null,
    },
    isLogin: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: action.payload.data,
                },
            };
        case GET_MY_POSITION_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    position: action.payload.data,
                },
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
            };
        default:
            return state;
    }
};
