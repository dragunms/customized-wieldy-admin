import React from 'react';
import {MailOutlined, HomeOutlined, PhoneOutlined} from '@ant-design/icons';

import {useAddress} from 'src/hook/useAddress';

import TranslationText from 'src/components/TranslationText';
import Widget from 'src/components/Widget';

const Contact = ({data}) => {
    const {getProvinceNameById, getDistrictNameById} = useAddress();

    const contactList = [
        {
            icon: <MailOutlined />,
            label: <TranslationText id='label.email' />,
            content: data.profile.email,
        },
        {
            icon: <HomeOutlined />,
            label: <TranslationText id='label.address' />,
            content: `${data.profile.address}, ${getDistrictNameById(data.profile.district_id)}, ${getProvinceNameById(
                data.profile.province_id
            )}`,
        },
        {
            icon: <PhoneOutlined />,
            label: <TranslationText id='label.phone_number' />,
            content: data.profile.phone_number,
        },
    ];
    return (
        <Widget title='Contact' styleName='gx-card-profile-sm'>
            {contactList.map((item, index) => {
                return (
                    <div
                        key={index.toString()}
                        className='gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list'
                    >
                        <div className='gx-mr-3'>{item.icon}</div>
                        <div className='gx-media-body'>
                            <span className='gx-mb-0 gx-text-grey gx-fs-sm'>{item.label}</span>
                            <p className='gx-mb-0'>{item.content}</p>
                        </div>
                    </div>
                );
            })}
        </Widget>
    );
};

export default Contact;
