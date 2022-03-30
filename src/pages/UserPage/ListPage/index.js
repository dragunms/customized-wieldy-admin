import withDataList from 'src/HOC/withDataList';

import {USER_ROLE} from 'src/constants/roles';
import {USER_STATUS_TAG} from 'src/constants/dataOptions';

import {clearUser, getPagingUser, deleteUser, pushItemUser} from 'src/redux/users/action';

const ListPage = () => {
    return null;
};

const list = [
    {
        name: 'avatar',
        type: 'thumb',
    },
    {
        name: 'name',
    },
    {
        name: 'status',
        type: 'status',
    },
];
const search = {};

export default withDataList(
    'users',
    {
        view: [USER_ROLE.READ],
        update: [USER_ROLE.UPDATE],
        delete: [USER_ROLE.DELETE],
        create: [USER_ROLE.CREATE],
    },
    {
        list: getPagingUser,
        delete: deleteUser,
        clear: clearUser,
        detail: pushItemUser,
    },
    list,
    'label.title',
    search,
    null,
    USER_STATUS_TAG
)(ListPage);
