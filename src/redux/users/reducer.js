import {CLEAR_USER, PUSH_ITEM_USER, PUSH_PAGING_USER, RELOAD_USER} from 'src/redux/users/action';

const INIT_STATE = {
    item: {},
    data: null,
    filter: null,
    reload: 0,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CLEAR_USER:
            return INIT_STATE;
        case PUSH_PAGING_USER:
            return {
                ...state,
                data: action.payload.data,
                filter: action.payload.filter,
            };
        case PUSH_ITEM_USER:
            return {
                ...state,
                item: action.payload.data,
            };
        case RELOAD_USER:
            return {
                ...state,
                reload: state.reload + 1,
            };
        default:
            return state;
    }
};
