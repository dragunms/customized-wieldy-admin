import {Pagination as AntPagination} from 'antd';
import React from 'react';
import querystring from 'querystring';
import {withRouter} from 'react-router-dom';

import history from 'src/redux/history';

const Pagination = ({page, totalPages, limit, location, ...props}) => {
    function handleOnPageChange(nextPage) {
        const params = querystring.decode(location.search.replace('?', ''));
        params.page = nextPage;
        history.push(`${location.pathname}?${querystring.encode(params)}`);
    }

    return (
        <AntPagination
            className='d-inline-block float-md-left'
            current={page}
            pageSize={limit}
            total={totalPages}
            onChange={handleOnPageChange}
            showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`}
            showSizeChanger={false}
            {...props}
        />
    );
};

export default withRouter(Pagination);
