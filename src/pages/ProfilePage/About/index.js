import React from 'react';
import {Col, Row, Tabs} from 'antd';

import TranslationText from 'src/components/TranslationText';
import Widget from 'src/components/Widget';
import AboutItem from './AboutItem';

import {convertRelativeTime} from 'src/utilities/util';

const {TabPane} = Tabs;

const About = ({data}) => {
    const aboutList = [
        {
            id: 1,
            title: <TranslationText id='label.address' />,
            icon: 'home',
            desc: [data.profile.address],
        },
        {
            id: 2,
            title: <TranslationText id='label.join_date' />,
            icon: 'birthday-new',
            desc: [convertRelativeTime(data.profile.created_at)],
        },
        {
            id: 3,
            title: <TranslationText id='label.office_position' />,
            icon: 'graduation',
            desc: [data.position.name],
        },
    ];
    return (
        <Widget title='About' styleName='gx-card-tabs gx-card-profile'>
            <Tabs className='gx-tabs-right' defaultActiveKey='1'>
                <TabPane tab='Overview' key='1'>
                    <div className='gx-mb-2'>
                        <Row>
                            {aboutList.map((about, index) => (
                                <Col key={index.toString()} xl={8} lg={12} md={12} sm={12} xs={24}>
                                    <AboutItem data={about} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        </Widget>
    );
};

export default About;
