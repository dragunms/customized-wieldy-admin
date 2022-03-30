import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const CustomScrollbars = React.forwardRef((props, ref) => (
    <Scrollbars
        {...props}
        autoHide
        renderTrackHorizontal={(childProps) => (
            <div {...childProps} style={{display: 'none'}} className='track-horizontal' />
        )}
        ref={ref}
    />
));

export default CustomScrollbars;
