import {
    INIT_SUCCESS,
    SERVER_RENDERED,
    GET_INIT_USER_POSITION_SUCCESS,

} from 'src/constants/actionTypes';

const INIT_STATE = {
    success: false,
    isClient: false,
    data: {},
};

function toValueLabel(data, valueField, labelField) {
    data.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.value = item[valueField];
        // eslint-disable-next-line no-param-reassign
        item.label = item[labelField];
        return item;
    });
    return data;
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SERVER_RENDERED:
            return {
                ...state,
                isClient: true,
            };
        case INIT_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case GET_INIT_USER_POSITION_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    userPositions: toValueLabel(action.payload.data, 'id', 'name'),
                },
            };
        default:
            return state;
    }
};
