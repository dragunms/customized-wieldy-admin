import React from 'react';

import './style.less';

const LazyImage = ({src, alt, className = ''}) => {
    return <img src={src} loading='lazy' className={`lazy-image ${className}`} alt={alt} />;
};

export default LazyImage;
