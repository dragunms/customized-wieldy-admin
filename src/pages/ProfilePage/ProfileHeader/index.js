import React from 'react';
import {Avatar, Menu, Dropdown, Tag} from 'antd';
import {Link} from 'react-router-dom';

import TranslationText from 'src/components/TranslationText';

import {CHANGE_PASSWORD_PATH} from 'src/constants/subPaths';

import {formatUrlImage} from 'src/utilities/util';

const ProfileHeader = ({data}) => {
    return (
        <>
            {data && (
                <div className='gx-profile-banner'>
                    <div className='gx-profile-container'>
                        <div className='gx-profile-banner-top'>
                            <div className='gx-profile-banner-top-left'>
                                <div className='gx-profile-banner-avatar'>
                                    <Avatar
                                        className='gx-size-90'
                                        alt={data.profile.name}
                                        src={formatUrlImage(data.profile.avatar)}
                                    />
                                </div>
                                <div className='gx-profile-banner-avatar-info'>
                                    <h2 className='gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light'>
                                        {data.profile.name}
                                    </h2>
                                    <p className='gx-mb-0 gx-fs-lg'>
                                        <span className='gx-ml-2'>
                                            <Tag color='#f50'>{data.position.name}</Tag>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='gx-profile-banner-top-right'>
                                <ul className='gx-follower-list'>
                                    <li>
                                        <span className='gx-follower-title gx-fs-lg gx-font-weight-medium'>2k+</span>
                                        <span className='gx-fs-sm'>Followers</span>
                                    </li>
                                    <li>
                                        <span className='gx-follower-title gx-fs-lg gx-font-weight-medium'>847</span>
                                        <span className='gx-fs-sm'>Following</span>
                                    </li>
                                    <li>
                                        <span className='gx-follower-title gx-fs-lg gx-font-weight-medium'>327</span>
                                        <span className='gx-fs-sm'>Friends</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='gx-profile-banner-bottom'>
                            <div className='gx-tab-list'>
                                <ul className='gx-navbar-nav'>
                                    <li>
                                        <span className='gx-link'>Timeline</span>
                                    </li>
                                    <li>
                                        <span className='gx-link'>About</span>
                                    </li>
                                    <li>
                                        <span className='gx-link'>Photos</span>
                                    </li>
                                    <li>
                                        <span className='gx-link'>
                                            Friends <span className='gx-fs-xs'>287</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className='gx-link'>More</span>
                                    </li>
                                </ul>
                            </div>
                            <span className='gx-link gx-profile-setting'>
                                <Dropdown
                                    trigger={['click']}
                                    overlay={
                                        <Menu>
                                            <Menu.Item key='detail'>
                                                <Link to={CHANGE_PASSWORD_PATH.PATH}>
                                                    <TranslationText id='label.change_password' />
                                                </Link>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <div className='gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0'>
                                        <i className='icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle' />
                                        <TranslationText id='label.setting' />
                                    </div>
                                </Dropdown>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileHeader;
