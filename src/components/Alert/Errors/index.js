import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import TranslationText from 'src/components/TranslationText';

const ErrorAlerts = ({title, onConfirm}) => {
    return (
        <div className='gx-main-content'>
            <SweetAlert error customClass='gx-sweet-alert-top-space' title={title} onConfirm={onConfirm}>
                <TranslationText id='sweetAlerts.btnClicked' />
            </SweetAlert>
        </div>
    );
};

export default ErrorAlerts;
