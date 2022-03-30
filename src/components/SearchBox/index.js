import React from 'react';
import {Input} from 'antd';

import AvForm from 'src/components/Form/AvForm';

const SearchBox = ({styleName, placeholder, onChange, defaultValue}) => {
    return (
        <div className={`gx-search-bar ${styleName}`}>
            <div className='gx-form-group'>
                <AvForm>
                    <Input type='search' placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
                </AvForm>
                <span className='gx-search-icon gx-pointer'>
                    <i className='icon icon-search' />
                </span>
            </div>
        </div>
    );
};

export default SearchBox;

SearchBox.defaultProps = {
    styleName: '',
    value: '',
};
