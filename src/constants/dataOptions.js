import {STATUS} from 'src/constants/dataVariable';
import React from 'react';
import TranslationText from 'src/components/TranslationText';

export const DEFAULT_STATUS_OPTION = [
    {
        value: 0,
        label: <TranslationText id='status.hidden' />,
        color: 'waiting',
    },
    {
        value: 1,
        label: <TranslationText id='status.show' />,
        color: 'activated',
    },
];

export const STATUS_OPTION = [
    {
        value: STATUS.WAITING,
        label: <TranslationText id='options.waiting' />,
        color: 'waiting',
    },
    {
        value: STATUS.ACTIVATED,
        label: <TranslationText id='options.activated' />,
        color: 'activated',
    },

    {
        value: STATUS.REJECT,
        label: <TranslationText id='options.reject' />,
        color: 'reject',
    },
    {
        value: STATUS.HIDDEN,
        label: <TranslationText id='options.hidden' />,
        color: 'hidden',
    },
    {
        value: STATUS.EXPIRED,
        label: <TranslationText id='options.expired' />,
        color: 'expired',
    },
];

export const USER_STATUS_OPTIONS = [
    {
        value: STATUS.NOT_VERIFIED,
        label: <TranslationText id='status.not_verified' />,
        color: 'hidden',
    },
    {
        value: STATUS.ACTIVATED,
        label: <TranslationText id='status.active' />,
        color: 'activated',
    },
    {
        value: STATUS.BLOCKED,
        label: <TranslationText id='status.block' />,
        color: 'reject',
    },
];

export const USER_STATUS_TAG = [
    {
        value: STATUS.NOT_VERIFIED,
        label: <TranslationText id='status.not_verified' />,
        color: 'processing',
    },
    {
        value: STATUS.ACTIVATED,
        label: <TranslationText id='status.active' />,
        color: 'success',
    },
    {
        value: STATUS.BLOCKED,
        label: <TranslationText id='status.block' />,
        color: 'warning',
    },
];
