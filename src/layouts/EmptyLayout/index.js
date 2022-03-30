import React from 'react';
import {Layout} from 'antd';
import PageRoute from 'src/routes/PageRoute';
import {LAYOUT_KEY} from 'src/routes/config';

const EmptyLayout = (props) => {
    return (
        <Layout className='gx-app-layout'>
            <PageRoute layoutKey={LAYOUT_KEY.EMPTY} {...props} />
        </Layout>
    );
};

export default EmptyLayout;
