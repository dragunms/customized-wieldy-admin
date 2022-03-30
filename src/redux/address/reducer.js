import {INIT_ADDRESS_SUCCESS} from 'src/constants/actionTypes';

const INIT_STATE = {
    provinces: [],
    districts: [],
    provinceObject: {},
    districtObject: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_ADDRESS_SUCCESS:
            return {
                ...state,
                provinces: action.payload.provinces,
                districts: action.payload.districts,
                provinceObject: action.payload.provinceObject,
                districtObject: action.payload.districtObject,
            };
        default:
            return state;
    }
};
