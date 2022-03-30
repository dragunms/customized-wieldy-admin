import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const StickyFilter = (props) => (
    <Scrollbars
        {...props}
        autoHide
        renderTrackHorizontal={(property) => (
            <div {...property} style={{display: 'none'}} className='track-horizontal' />
        )}
        renderTrackVertical={(property) => <div {...property} style={{display: 'none'}} className='track-vertical' />}
    />
);

export default StickyFilter;
