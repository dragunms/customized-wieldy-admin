import {deleteData, getData, postData, putData} from 'src/utilities/requestApi';
import {USER_ENDPOINT} from 'src/constants/apiEndpoints';

const UserServiceAPI = {
    getPaging: (options = {}) => {
        options = {
            page: 1,
            ...options,
        };
        return getData(USER_ENDPOINT, options);
    },
    getOne: (id) => {
        return getData(`${USER_ENDPOINT}/${id}`);
    },
    getOneInfo: (id) => {
        return getData(`${USER_ENDPOINT}/preview/${id}`);
    },
    createOne: (data) => {
        return postData(USER_ENDPOINT, data);
    },
    updateOne: (id, data) => {
        return putData(`${USER_ENDPOINT}/${id}`, data);
    },
    delete: (id) => {
        return deleteData(`${USER_ENDPOINT}/${id}`);
    },
};

export default UserServiceAPI;
