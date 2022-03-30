import 'video-react/styles/scss/video-react.scss';

import React from 'react';
import {BigPlayButton, Player} from 'video-react';

const VideoPlayer = (props) => {
    return (
        <Player playsInline {...props}>
            <BigPlayButton position='center' />
        </Player>
    );
};

export default VideoPlayer;
