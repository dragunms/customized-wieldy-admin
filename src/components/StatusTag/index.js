import React from 'react';
import {Tag} from 'antd';
import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';

import TranslationText from 'src/components/TranslationText';

import {STATUS} from 'src/constants/dataVariable';

const StatusTag = ({status, list}) => {
    const tags = [
        {
            id: STATUS.ACTIVATED,
            Component: (
                <Tag icon={<CheckCircleOutlined />} color='success'>
                    <TranslationText id='status.activate' />
                </Tag>
            ),
        },
        {
            id: STATUS.WAITING,
            Component: (
                <Tag icon={<SyncOutlined spin />} color='processing'>
                    <TranslationText id='status.waiting' />
                </Tag>
            ),
        },
        {
            id: STATUS.REJECT,
            Component: (
                <Tag icon={<CloseCircleOutlined />} color='error'>
                    <TranslationText id='status.reject' />
                </Tag>
            ),
        },
        {
            id: STATUS.EXPIRED,
            Component: (
                <Tag icon={<ExclamationCircleOutlined />} color='warning'>
                    <TranslationText id='status.expired' />
                </Tag>
            ),
        },
        {
            id: STATUS.HIDDEN,
            Component: (
                <Tag icon={<ClockCircleOutlined />} color='default'>
                    <TranslationText id='status.hidden' />
                </Tag>
            ),
        },
    ];
    return (
        <>
            {list
                ? list.map((tag, index) => {
                      if (tag.value === status)
                          return (
                              <span key={index.toString()}>
                                  <Tag icon={<ClockCircleOutlined />} color={tag.color}>
                                      {tag.label}
                                  </Tag>
                              </span>
                          );
                      return '';
                  })
                : tags.map((tag, index) => {
                      if (tag.id === status) return <span key={index.toString()}>{tag.Component}</span>;
                      return '';
                  })}
        </>
    );
};
export default StatusTag;
