import {useSelector} from 'react-redux';

export const useAddress = () => {
    const {provinces, districts, provinceObject, districtObject} = useSelector((state) => state.address);

    function getProvinces() {
        return provinces;
    }

    function getDistricts() {
        return districts;
    }

    function getDistrictsByProvinceId(provinceId) {
        return districts.filter((item) => item.province_id === Number(provinceId));
    }

    function getProvinceNameById(provinceId) {
        if (provinceObject[provinceId]) {
            return provinceObject[provinceId].name;
        }
        return '';
    }

    function getDistrictNameById(districtId) {
        if (districtObject[districtId]) {
            return districtObject[districtId].name;
        }
        return '';
    }

    function getLocationNameById(provinceId, districtId) {
        let address = '';

        if (districtObject[districtId]) {
            address = `${districtObject[districtId].name}, `;
        }

        if (provinceObject[provinceId]) {
            address = `${address}${provinceObject[provinceId].name}`;
        }

        return address;
    }

    function getAddress(address, provinceId, districtId) {
        let location = '';
        if (address) {
            location = `${address}, `;
        }
        return location + getLocationNameById(provinceId, districtId);
    }

    return {
        getProvinces,
        getDistrictsByProvinceId,
        getLocationNameById,
        getProvinceNameById,
        getDistrictNameById,
        getDistricts,
        getAddress,
    };
};
