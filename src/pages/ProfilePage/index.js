import React from 'react';
import {Col, Row} from 'antd';

import withUser from 'src/HOC/withUser';
import About from 'src/pages/ProfilePage/About';
import Biography from 'src/pages/ProfilePage/Biography';
import Events from 'src/pages/ProfilePage/Events';
import Contact from 'src/pages/ProfilePage/Contact';
import Friends from 'src/pages/ProfilePage/Friends';
import Photos from 'src/pages/ProfilePage/Photos';
import Auxiliary from 'src/utilities/Auxiliary';
import ProfileHeader from 'src/pages/ProfilePage/ProfileHeader';

import {friendList} from './Profile/data';
import {photoList} from './Wall/data';

const Profile = ({user}) => {
    return (
        <Auxiliary>
            <ProfileHeader data={user} />
            <div className='gx-profile-content'>
                <Row>
                    <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                        <About data={user} />
                        <Biography />
                        <Events />
                    </Col>

                    <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                        <Contact data={user} />
                        <Row>
                            <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                                <Friends friendList={friendList} />
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                                <Photos photoList={photoList} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Auxiliary>
    );
};

export default withUser()(Profile);
