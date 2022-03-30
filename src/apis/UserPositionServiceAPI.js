import {deleteData, getData, postData, putData} from 'src/utilities/requestApi';
import {USER_POSITION_ENDPOINT} from 'src/constants/apiEndpoints';

const UserPositionServiceAPI = {
    getList: () => {
        return getData(`${USER_POSITION_ENDPOINT}/all`);
    },
    getPaging: (options = {}) => {
        options = {
            page: 1,
            ...options,
        };
        return getData(USER_POSITION_ENDPOINT, options);
    },
    getOne: (id) => {
        return getData(`${USER_POSITION_ENDPOINT}/${id}`);
    },
    createOne: (data) => {
        return postData(USER_POSITION_ENDPOINT, data);
    },
    updateOne: (id, data) => {
        return putData(`${USER_POSITION_ENDPOINT}/${id}`, data);
    },
    delete: (id) => {
        return deleteData(`${USER_POSITION_ENDPOINT}/${id}`);
    },
};

export default UserPositionServiceAPI;
