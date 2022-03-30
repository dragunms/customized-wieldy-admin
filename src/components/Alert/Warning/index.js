import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import TranslationText from 'src/components/TranslationText';

const WarningAlerts = ({title, onConfirm, onCancel, children}) => {
    return (
        <div className='gx-main-content'>
            <SweetAlert
                warning
                showCancel
                cancelBtnText={<TranslationText id='label.cancel' />}
                confirmBtnText={<TranslationText id='label.confirm' />}
                confirmBtnBsStyle='danger'
                cancelBtnBsStyle='default'
                title={title}
                onConfirm={onConfirm}
                onCancel={onCancel}
            >
                {children}
            </SweetAlert>
        </div>
    );
};

export default WarningAlerts;
