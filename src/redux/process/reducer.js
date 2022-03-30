import {IN_PROCESS, PROCESS_COMPLETE} from 'src/constants/actionTypes';

const INIT_STATE = {
    inProcess: 0,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case IN_PROCESS:
            return {
                ...state,
                inProcess: 1,
            };
        case PROCESS_COMPLETE:
            return {
                ...state,
                inProcess: 0,
            };
        default:
            return state;
    }
};
