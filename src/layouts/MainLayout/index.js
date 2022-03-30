import './styles.less';

import React from 'react';
import {Layout} from 'antd';

import Sidebar from 'src/partials/Sidebar';
import Topbar from 'src/partials/Topbar';

import PageRoute from 'src/routes/PageRoute';
import {LAYOUT_KEY} from 'src/routes/config';

const {Content, Footer} = Layout;

const MainLayout = (props) => {
    return (
        <Layout className='gx-app-layout'>
            <Sidebar />
            <Layout>
                <Topbar />
                <Content>
                    <div className='gx-main-content-wrapper'>
                        <PageRoute layoutKey={LAYOUT_KEY.MAIN} {...props} />
                    </div>
                    <Footer>
                        <div className='gx-layout-footer-content' />
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
