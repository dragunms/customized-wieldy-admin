import React from 'react';
import {Link} from 'react-router-dom';

import TranslationText from 'src/components/TranslationText';

const NotFoundPage = () => (
    <div className='gx-page-error-container'>
        <div className='gx-page-error-content'>
            <div className='gx-error-code gx-mb-4'>404</div>
            <h2 className='gx-text-center'>
                <TranslationText id='not_found_page.message' />
            </h2>
            <p className='gx-text-center'>
                <Link className='gx-btn gx-btn-primary' to='/'>
                    <TranslationText id='not_found_page.back' />
                </Link>
            </p>
        </div>
    </div>
);

export default NotFoundPage;
