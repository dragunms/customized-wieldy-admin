import './styles.less';

import {Button, Spin} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';

const LoadingButton = ({type = 'submit', children, id, onClick, className = 'gx-btn-primary'}) => {
    const loading = useSelector((state) => state.process.inProcess);
    return (
        <Button
            className={`button ant-btn-primary ${className} loading-button`}
            htmlType={type}
            id={id}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? <Spin className='loading-spin' /> : children}
        </Button>
    );
};

export default LoadingButton;
