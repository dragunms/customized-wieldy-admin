import withDataList from 'src/HOC/withDataList';

import {USER_POSITION_ROLE} from 'src/constants/roles';

import {
    clearUserPosition,
    deleteUserPosition,
    getPagingUserPosition,
    pushItemUserPosition,
} from 'src/redux/userPositions/action';

const ListPage = () => {
    return '';
};

const columns = [{name: 'name'}];

const search = {
    is_hot: {
        type: 'switch',
    },
};

export default withDataList(
    'userPositions',
    {
        view: [USER_POSITION_ROLE.READ],
        update: [USER_POSITION_ROLE.UPDATE],
        create: [USER_POSITION_ROLE.CREATE],
        delete: [USER_POSITION_ROLE.DELETE],
    },
    {
        list: getPagingUserPosition,
        delete: deleteUserPosition,
        edit: pushItemUserPosition,
        clear: clearUserPosition,
    },
    columns,
    'label.title',
    search,
    false
)(ListPage);
