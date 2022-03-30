export const CREATE_ONE_USER = 'CREATE_ONE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_ONE_USER = 'GET_ONE_USER';
export const GET_PAGING_USER = 'GET_PAGING_USER';
export const PUSH_ITEM_USER = 'PUSH_ITEM_USER';
export const PUSH_PAGING_USER = 'PUSH_PAGING_USER';
export const RELOAD_USER = 'RELOAD_USER';
export const UPDATE_ONE_USER = 'UPDATE_ONE_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const getPagingUser = (options) => {
    return {
        type: GET_PAGING_USER,
        payload: {
            options,
        },
    };
};
export const getOneUser = (id) => {
    return {
        type: GET_ONE_USER,
        payload: {
            id,
        },
    };
};

export const pushItemUser = (item) => {
    return {
        type: PUSH_ITEM_USER,
        payload: {
            data: item,
        },
    };
};

export const clearUser = () => {
    return {
        type: CLEAR_USER,
    };
};

export const createUser = (data) => {
    return {
        type: CREATE_ONE_USER,
        payload: {
            data,
        },
    };
};

export const updateUser = (id, data) => {
    return {
        type: UPDATE_ONE_USER,
        payload: {
            back: true,
            data,
            id,
        },
    };
};
export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: {
            id,
        },
    };
};
