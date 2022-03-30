import {GET_VERSION_ENDPOINT} from 'src/constants/apiEndpoints';

import {getData} from 'src/utilities/requestApi';

const VersionServiceApi = {
    getVersionData: () => {
        return getData(GET_VERSION_ENDPOINT);
    },
};

export default VersionServiceApi;
