import React from 'react';

const Loading = ({background = 'transparent', color}) => {
    return (
        <div className='wrapper-loading' style={{background}}>
            <div className='loading'>
                <div style={{background: color}} />
                <div style={{background: color}} />
                <div style={{background: color}} />
                <div style={{background: color}} />
            </div>
        </div>
    );
};

export default Loading;
