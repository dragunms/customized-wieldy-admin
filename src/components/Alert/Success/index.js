import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import TranslationText from 'src/components/TranslationText';

const SuccessAlerts = ({title, onConfirm}) => {
    return (
        <div className='gx-main-content'>
            <SweetAlert success title={title} onConfirm={onConfirm}>
                <TranslationText id='sweetAlerts.btnClicked' />
            </SweetAlert>
        </div>
    );
};

export default SuccessAlerts;
