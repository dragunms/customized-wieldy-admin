import moment from 'moment';
import {message} from 'antd';
import copy from 'copy-to-clipboard';
import sanitizeHtml from 'sanitize-html';
import 'moment/locale/vi';

export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatMoneyNumber(number, prefix = ' đ') {
    if (number.toString() === '0') {
        return 'Liên hệ';
    }
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + prefix;
}

export function convertRelativeTime(time) {
    if (time) {
        moment.locale('vi');
        // eslint-disable-next-line no-param-reassign
        time = Number(time);
        const currentTime = moment().unix();
        const timeCheck = currentTime - time;

        if (timeCheck > 604800) {
            return moment.unix(time).format('DD/MM/YYYY');
        }
        return moment.unix(time).fromNow();
    }
    return '';
}

export function convertDate(time) {
    return moment.unix(time).format('DD/MM/YYYY');
}

export function convertTime(time) {
    return time ? moment.unix(time).format('LT') : '';
}

export function isToday(time) {
    // eslint-disable-next-line no-param-reassign
    time = Number(time);
    const currentTime = moment().unix();
    const timeCheck = currentTime - time;

    return Math.floor(timeCheck / 3600) <= 24;
}

export function calculateDiscountedPrice(price, discount, unit = ' đ') {
    // eslint-disable-next-line no-param-reassign
    price = Number(price);
    // eslint-disable-next-line no-param-reassign
    discount = Number(discount);
    let newPrice = Math.round(price - (price / 100) * discount);
    if (newPrice < 0) {
        newPrice = 0;
        return formatMoneyNumber(newPrice, unit);
    }
    return formatMoneyNumber(newPrice, unit);
}

export function formatUrlAsset(url) {
    if (!url) {
        return undefined;
    }
    if (!url.startsWith('http')) {
        // eslint-disable-next-line no-param-reassign
        url = `${process.env.REACT_APP_ASSET_URL}/${url}`;
    }
    return url;
}

export function formatUrlImage(url, width, height, type = 'jpg') {
    if (`${url}`.includes('?')) {
        return url;
    }
    // eslint-disable-next-line no-param-reassign
    url = formatUrlAsset(url);
    if (url) {
        const imageHeight = height ? `&h=${height}` : '';
        const imageWidth = width ? `&w=${width}` : '';
        return `${url}?t=${type}${imageWidth}${imageHeight}`;
    }
    return undefined;
}

export function setCacheLocalStorage(key, value) {
    if (typeof value !== 'object' || typeof value !== 'boolean') {
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

export function getCacheLocalStorage(key) {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

export function rad(x) {
    return (x * Math.PI) / 180;
}

export function calculateMapDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat - p1.lat);
    const dLong = rad(p2.lng - p1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
}

export function parseLocation(p1, p2) {
    const parse = calculateMapDistance(p1, p2);
    return parse > 100 ? `${(parse / 1000).toFixed(2)} km` : `${parse.toFixed(2)} m`;
}

export function capitalizeFirstLetters(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toSlug(string) {
    let str = string;
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');

    return str;
}

export function copyClipboard(value) {
    copy(value, {
        message: 'Copied',
    });
    message.success('Copied!', 1000);
}

export function flattenMessages(nestedMessages, prefix = '') {
    if (nestedMessages === null) {
        return {};
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            Object.assign(messages, {[prefixedKey]: value});
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export function sanitize(content) {
    // eslint-disable-next-line
    content = sanitizeHtml(content, {
        allowedTags: [
            'img',
            'span',
            'address',
            'article',
            'aside',
            'footer',
            'header',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'nav',
            'section',
            'blockquote',
            'figcaption',
            'figure',
            'hr',
            'li',
            'main',
            'ol',
            'p',
            'pre',
            'ul',
            'a',
            'b',
            'br',
            'code',
            'em',
            'i',
            'kbd',
            'mark',
            'q',
            's',
            'small',
            'strong',
            'sub',
            'sup',
            'time',
            'u',
            'wbr',
            'caption',
            'col',
            'colgroup',
            'table',
            'tbody',
            'td',
            'tfoot',
            'th',
            'thead',
            'tr',
            'video',
            'iframe',
            'svg',
            'details',
            'summary',
        ],
        allowedAttributes: {
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'title'],
            iframe: ['src'],
            '*': ['style', 'itemscope', 'itemtype', 'itemprop'],
            details: ['open'],
        },
        allowedStyles: {
            '*': {
                // Match HEX and RGB
                // eslint-disable-next-line
                color: [/^\#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                // Match any number with px, em, or %
                'font-size': [/^\d+(?:px|em|%)$/],
                'font-style': [/^.*$/],
                'font-weight': [/^bold$/],
                'font-family': [/^.*$/],
                padding: [/^\d+(?:px|em|%)$/],
                'max-width': [/^\d+(?:px|em|%)$/],
                'max-height': [/^\d+(?:px|em|%)$/],
                'padding-left': [/^\d+(?:px|em|%)$/],
                'padding-right': [/^\d+(?:px|em|%)$/],
                'padding-top': [/^\d+(?:px|em|%)$/],
                'padding-bottom': [/^\d+(?:px|em|%)$/],
                margin: [/^\d+(?:px|em|%)$/],
                'margin-top': [/^\d+(?:px|em|%)$/],
                'margin-left': [/^\d+(?:px|em|%)$/],
                'margin-right': [/^\d+(?:px|em|%)$/],
                'margin-bottom': [/^\d+(?:px|em|%)$/],
                'border-radius': [/^\d+(?:px|em|%)$/],
                'vertical-align': [
                    /^length$/,
                    /^%$/,
                    /^sub/,
                    /^super$/,
                    /^top$/,
                    /^text-top$/,
                    /^middle/,
                    /^bottom$/,
                    /^text-bottom$/,
                    /^initial$/,
                    /^inherit$/,
                ],
                colspan: [/^\d+/],
            },
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesAppliedToAttributes: ['href', 'src'],
        allowedIframeHostnames: ['www.youtube.com'],
    });
    return content.trim();
}

export const uidGenerator = () => {
    const S4 = () => {
        // eslint-disable-next-line no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};
