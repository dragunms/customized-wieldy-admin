import _ from 'lodash';
import {useSelector} from 'react-redux';

export const useCategory = (reducer) => {
    const categories = useSelector((state) => state.init.data[reducer]);

    function getParentCategories() {
        return _.filter(categories, (obj) => !obj.parent_id);
    }

    function getCategories() {
        return categories;
    }

    function getCategoryNameById(id) {
        if (id && categories && categories[id]) {
            return categories[id].name;
        }
        return '';
    }

    function getSubCategories(parentId) {
        if (parentId) {
            return _.filter(categories, (item) => item.parent_id === parentId);
        }
        return [];
    }

    function getParentCategoryByArrayId(parentCategoryId) {
        if (parentCategoryId) {
            return parentCategoryId
                .map((item) => {
                    return getCategoryNameById(item);
                })
                .join(', ');
        }

        return '';
    }

    return {
        getCategoryNameById,
        getParentCategoryByArrayId,
        getParentCategories,
        getSubCategories,
        getCategories,
    };
};
