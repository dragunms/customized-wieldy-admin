import {
    CLEAR_USER_POSITION,
    PUSH_ITEM_USER_POSITION,
    PUSH_PAGING_USER_POSITION,
    RELOAD_USER_POSITION,
} from 'src/redux/userPositions/action';

const INIT_STATE = {
    item: {},
    data: null,
    filter: null,
    reload: 0,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CLEAR_USER_POSITION:
            return INIT_STATE;
        case PUSH_PAGING_USER_POSITION:
            return {
                ...state,
                data: action.payload.data,
                filter: action.payload.filter,
            };
        case PUSH_ITEM_USER_POSITION:
            return {
                ...state,
                item: action.payload.data,
            };
        case RELOAD_USER_POSITION:
            return {
                ...state,
                reload: state.reload + 1,
            };
        default:
            return state;
    }
};
