export const CREATE_ONE_USER_POSITION = 'CREATE_ONE_USER_POSITION';
export const DELETE_USER_POSITION = 'DELETE_USER_POSITION';
export const GET_ONE_USER_POSITION = 'GET_ONE_USER_POSITION';
export const GET_PAGING_USER_POSITION = 'GET_PAGING_USER_POSITION';
export const PUSH_ITEM_USER_POSITION = 'PUSH_ITEM_USER_POSITION';
export const PUSH_PAGING_USER_POSITION = 'PUSH_PAGING_USER_POSITION';
export const RELOAD_USER_POSITION = 'RELOAD_USER_POSITION';
export const UPDATE_ONE_USER_POSITION = 'UPDATE_ONE_USER_POSITION';
export const CLEAR_USER_POSITION = 'CLEAR_USER_POSITION';

export const getPagingUserPosition = (options) => {
    return {
        type: GET_PAGING_USER_POSITION,
        payload: {
            options,
        },
    };
};
export const getOneUserPosition = (id) => {
    return {
        type: GET_ONE_USER_POSITION,
        payload: {
            id,
        },
    };
};

export const pushItemUserPosition = (item) => {
    return {
        type: PUSH_ITEM_USER_POSITION,
        payload: {
            data: item,
        },
    };
};

export const clearUserPosition = () => {
    return {
        type: CLEAR_USER_POSITION,
    };
};

export const createUserPosition = (data) => {
    return {
        type: CREATE_ONE_USER_POSITION,
        payload: {
            data,
        },
    };
};

export const updateUserPosition = (id, data) => {
    return {
        type: UPDATE_ONE_USER_POSITION,
        payload: {
            back: true,
            data,
            id,
        },
    };
};
export const deleteUserPosition = (id) => {
    return {
        type: DELETE_USER_POSITION,
        payload: {
            id,
        },
    };
};
