import {SERVER_RENDERED} from 'src/constants/actionTypes';

export const detectServerRendered = () => {
    return {
        type: SERVER_RENDERED,
    };
};
