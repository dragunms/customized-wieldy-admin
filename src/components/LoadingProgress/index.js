import './styles.less';

import React from 'react';

const LoadingProgress = ({className = ''}) => (
    <div className={`loader loading-progress-loader ${className}`}>
        <div className={`sk-folding-cube ${className}`}>
            <div className='sk-cube1 sk-cube' />
            <div className='sk-cube2 sk-cube' />
            <div className='sk-cube4 sk-cube' />
            <div className='sk-cube3 sk-cube' />
        </div>
    </div>
);
export default LoadingProgress;
